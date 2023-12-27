// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface ITokenLock {
    function lockTokens(
        address _tokenAddress,
        address _beneficiary,
        uint256 _amount,
        uint256 _lockDuration,
        bool _vesting,
        uint256 _firstReleasePercentage,
        uint256 _vestingPeriodInDays,
        uint256 _cycleReleasePercentage
    ) external;
}
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";

contract Auction is Ownable {
    struct AuctionStruct {
        ERC20 token;
        ERC20 purchaseToken;
        address creator;
        bool whitelistedEnabled;
        bool burnOrRefund;
        bool burnedOrRefunded;
        bool vestingEnabled;
        bool devFeeInToken;
        bool auctionFinalized;
        uint256 tokensToSell;
        uint256 softCap;
        uint256 hardCap;
        uint256 startPrice;
        uint256 endPrice;
        uint256 moneyRaised;
        uint256 actualMoneyRaised;
        uint256 tokensSold;
        uint256 devCommission;
        uint256 devCommissionInToken;
        uint256 minBuy;
        uint256 maxBuy;
        uint256 decPriceCycle;
        uint256 startTime;
        uint256 endTime;
        uint256 lastPrice;
        uint256 liquidityAdditionPercent;
        uint256 liquidityUnlockTime;
        uint256 listingAmount;
        uint256 firstReleasePercentage;
        uint256 vestingPeriod;
        uint256 cycleReleasePercentage;
        mapping(address => bool) whitelisted;
        mapping(address => uint256) tokensPurchased;
        mapping(address => uint256) tokensInvested;
        mapping(address => uint256) tokensVested;
        mapping(address => uint256) lastClaimedCycle;
    }

    uint256 public devFeeInTokenPercentage = 2; // 2%
    uint256 public devFee = 5; // 5%
    AuctionStruct[] public Auctions;
    mapping(address => uint256[]) private userAuctions;
    mapping(address => uint256[]) private userInvested;

    IUniswapV2Factory public uniswapV2Factory =
        IUniswapV2Factory(0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32);
    IUniswapV2Router02 public uniswapV2Router =
        IUniswapV2Router02(0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff);
    IUniswapV2Router02 public uniswapV2RouterETH =
        IUniswapV2Router02(0x8954AfA98594b838bda56FE4C12a09D7739D179b);
    address public WMATIC = 0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889;
    ITokenLock tokenLock;

    function returnLength() external view returns (uint256) {
        return Auctions.length;
    }

    function getUserAuctions(
        address _user
    ) external view returns (uint256[] memory) {
        return userAuctions[_user];
    }

    function getUserInvested(
        address _user
    ) external view returns (uint256[] memory) {
        return userInvested[_user];
    }

    function updateDevFee(uint256 _newFee) external onlyOwner {
        require(_newFee >= 0 && _newFee <= 5, "Must be less than 5%");
        devFee = _newFee;
    }

    function calculateTokensMul(
        uint256 amountA,
        uint256 amountB,
        uint256 decimalsA,
        uint256 decimalsB
    ) internal pure returns (uint256) {
        uint256 tokens;
        tokens = (amountA * amountB) / (10 ** decimalsB);
        return tokens;
    }

    function calculateTokensDiv(
        uint256 amountA,
        uint256 amountB,
        uint256 decimalsA,
        uint256 decimalsB
    ) internal pure returns (uint256) {
        uint256 tokens;
        tokens = (amountA * (10 ** decimalsB)) / amountB;
        return tokens;
    }

    function createAuction(
        address _tokenAddress,
        address _purchaseTokenAddress,
        bool _whitelistedEnabled,
        bool _burnOrRefund,
        bool _vestingEnabled,
        bool _devFeeInToken,
        uint256 _tokensToSell,
        uint256 _minBuy,
        uint256 _maxBuy,
        uint256 _decPriceCycle,
        uint256 _startPrice,
        uint256 _endPrice,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _liquidityAdditionPercent,
        uint256 _liquidityUnlockTime,
        uint256 _firstReleasePercentage,
        uint256 _vestingPeriod,
        uint256 _cycleReleasePercentage
    ) external payable {
        require(
            _tokenAddress != address(0),
            "tokenAddress can't be zero address"
        );
        require(
            _startPrice > _endPrice,
            "Start Price must be more than End Price"
        );
        require(
            _startPrice >= _endPrice / 5,
            "Softcap must be more than 20% of hardcap"
        );
        require(_minBuy < _maxBuy, "Min buy !>= max buy");
        require(_startTime >= block.timestamp, "Start Time can't be in past");
        require(
            _endTime - _startTime <= 30 days,
            "Auction duration can't exceed one month"
        );
        require(
            _liquidityAdditionPercent > 50 && _liquidityAdditionPercent <= 100,
            "LiquidityAdditionPercent must be in between 51-100%"
        );

        require(
            _liquidityUnlockTime >= 30 days,
            "liquidityUnlockTime must be >= 30 days"
        );
        require(
            _firstReleasePercentage + _cycleReleasePercentage <= 100,
            "Invalid Release %"
        );
        // require(msg.value == 1 ether, "Creation fee invalid");

        ERC20 token = ERC20(_tokenAddress);
        uint256 purchaseTokenDecimals = 18;
        if (_purchaseTokenAddress != address(0))
            purchaseTokenDecimals = ERC20(_purchaseTokenAddress).decimals();

        if (_devFeeInToken) {
            uint256 tokensForDevFee = (_tokensToSell *
                devFeeInTokenPercentage) / 100;
            require(
                token.allowance(msg.sender, address(this)) >=
                    tokensForDevFee +
                        _tokensToSell +
                        ((_tokensToSell * _liquidityAdditionPercent) / 100),
                "Check the token allowance"
            );
            token.transferFrom(
                msg.sender,
                address(this),
                tokensForDevFee +
                    _tokensToSell +
                    ((_tokensToSell * _liquidityAdditionPercent) / 100)
            );
        } else {
            require(
                token.allowance(msg.sender, address(this)) >=
                    _tokensToSell +
                        ((_tokensToSell * _liquidityAdditionPercent) / 100),
                "Check the token allowance"
            );
            token.transferFrom(
                msg.sender,
                address(this),
                _tokensToSell +
                    ((_tokensToSell * _liquidityAdditionPercent) / 100)
            );
        }
        (bool success, ) = payable(owner()).call{value: msg.value}("");
        require(success, "Transfer failed");

        uint256 softCap = calculateTokensMul(
            _endPrice,
            _tokensToSell,
            purchaseTokenDecimals,
            token.decimals()
        );
        uint256 hardCap = calculateTokensMul(
            _startPrice,
            _tokensToSell,
            purchaseTokenDecimals,
            token.decimals()
        );

        Auctions.push();
        AuctionStruct storage newAuction = Auctions[Auctions.length - 1];
        newAuction.token = ERC20(_tokenAddress);
        newAuction.purchaseToken = ERC20(_purchaseTokenAddress);
        newAuction.creator = msg.sender;
        newAuction.whitelistedEnabled = _whitelistedEnabled;
        newAuction.burnOrRefund = _burnOrRefund;
        newAuction.vestingEnabled = _vestingEnabled;
        newAuction.devFeeInToken = _devFeeInToken;
        newAuction.tokensToSell = _tokensToSell;
        newAuction.softCap = softCap;
        newAuction.hardCap = hardCap;
        newAuction.startPrice = _startPrice;
        newAuction.endPrice = _endPrice;
        newAuction.minBuy = _minBuy;
        newAuction.maxBuy = _maxBuy;
        newAuction.decPriceCycle = _decPriceCycle;
        newAuction.startTime = _startTime;
        newAuction.endTime = _endTime;
        newAuction.liquidityAdditionPercent = _liquidityAdditionPercent;
        newAuction.liquidityUnlockTime = _liquidityUnlockTime;
        newAuction.listingAmount = ((_tokensToSell *
            _liquidityAdditionPercent) / 100);
        newAuction.firstReleasePercentage = _firstReleasePercentage;
        newAuction.vestingPeriod = _vestingPeriod;
        newAuction.cycleReleasePercentage = _cycleReleasePercentage;
        userAuctions[msg.sender].push(Auctions.length - 1);
    }

    function whitelistAddress(uint256 _AuctionIndex, address _buyer) external {
        AuctionStruct storage auction = Auctions[_AuctionIndex];
        require(
            auction.whitelistedEnabled == true,
            "Whitelisting is not enabled"
        );
        require(msg.sender == auction.creator, "Only creator can whitelist");
        require(block.timestamp < auction.endTime, "auction has ended");
        auction.whitelisted[_buyer] = true;
    }

    function buyToken(uint256 _auctionIndex, uint256 _amount) external payable {
        AuctionStruct storage auction = Auctions[_auctionIndex];
        require(
            block.timestamp >= auction.startTime,
            "Auction has not started yet"
        );
        require(
            block.timestamp >= auction.startTime &&
                block.timestamp <= auction.endTime,
            "Auction not active"
        );
        if (auction.whitelistedEnabled) {
            require(auction.whitelisted[msg.sender], "Address not whitelisted");
        }
        require(
            _amount >= auction.minBuy && _amount <= auction.maxBuy,
            "Invalid _amount"
        );

        uint256 elapsed = block.timestamp - auction.startTime;
        uint256 duration = auction.endTime - auction.startTime;
        uint256 totalCycles = duration / (auction.decPriceCycle * 60);

        uint256 currentCycle = elapsed / (auction.decPriceCycle * 60);
        if (currentCycle > totalCycles) {
            currentCycle = totalCycles;
        }

        uint256 currentPrice = auction.startPrice -
            (currentCycle * (auction.startPrice - auction.endPrice)) /
            totalCycles;

        uint256 purchaseTokenDecimals = 18;
        if (address(auction.purchaseToken) != address(0))
            purchaseTokenDecimals = auction.purchaseToken.decimals();
        uint256 tokensToBuy = calculateTokensDiv(
            _amount,
            currentPrice,
            18,
            auction.token.decimals()
        );

        require(
            auction.tokensSold + tokensToBuy <= auction.tokensToSell,
            "Hard cap reached"
        );

        if (address(auction.purchaseToken) == address(0)) {
            require(msg.value >= _amount, "Not enough AVAX provided");
        } else {
            require(
                auction.purchaseToken.allowance(msg.sender, address(this)) >=
                    _amount,
                "Check the token allowance"
            );
            auction.purchaseToken.transferFrom(
                msg.sender,
                address(this),
                _amount
            );
        }

        auction.tokensSold += tokensToBuy;
        auction.moneyRaised += _amount;
        auction.tokensPurchased[msg.sender] += tokensToBuy;
        auction.tokensInvested[msg.sender] += _amount;
        if (auction.tokensSold >= auction.tokensToSell) {
            auction.lastPrice = currentPrice;
        }
        userInvested[msg.sender].push(_auctionIndex);
    }

    function refundInvestment(uint256 _AuctionId) external {
        AuctionStruct storage auction = Auctions[_AuctionId];

        require(block.timestamp > auction.endTime, "auction has not ended yet");
        require(auction.moneyRaised < auction.softCap, "SoftCap was reached");
        if (msg.sender == auction.creator) {
            auction.token.transfer(
                auction.creator,
                auction.token.balanceOf(address(this))
            );
        } else {
            require(
                auction.tokensInvested[msg.sender] > 0,
                "No investment to refund"
            );
            uint256 investmentToRefund = auction.tokensInvested[msg.sender];
            auction.tokensInvested[msg.sender] = 0;

            if (address(auction.purchaseToken) == address(0)) {
                (bool success, ) = payable(msg.sender).call{
                    value: investmentToRefund
                }("");
                require(success, "Transfer failed");
            } else {
                auction.purchaseToken.transfer(msg.sender, investmentToRefund);
            }
        }
    }

    function finalizeAuction(uint256 _auctionIndex) public {
        AuctionStruct storage auction = Auctions[_auctionIndex];
        require(block.timestamp > auction.endTime, "auction has not ended yet");
        require(
            auction.moneyRaised >= auction.softCap,
            "SoftCap wasn't reached"
        );
        require(
            !auction.auctionFinalized,
            "Auction has already been finalized"
        );

        if (auction.lastPrice == 0) auction.lastPrice = auction.endPrice;

        auction.actualMoneyRaised = calculateTokensMul(
            auction.lastPrice,
            auction.tokensSold,
            18,
            auction.token.decimals()
        );
        uint256 devShare;
        if (auction.devFeeInToken) {
            devShare =
                (auction.actualMoneyRaised * devFeeInTokenPercentage) /
                100;
            uint256 devShareInToken = (auction.tokensSold *
                devFeeInTokenPercentage) / 100;
            auction.devCommissionInToken += devShareInToken;
        } else devShare = (auction.actualMoneyRaised * devFee) / 100;

        auction.devCommission += devShare;
        auction.auctionFinalized = true;
    }

    function claimTokens(uint256 _AuctionId) external {
        AuctionStruct storage auction = Auctions[_AuctionId];
        require(
            block.timestamp >= auction.endTime,
            "Auction has not ended yet"
        );
        require(auction.moneyRaised >= auction.softCap, "SoftCap not reached");
        require(
            auction.tokensPurchased[msg.sender] >
                auction.tokensVested[msg.sender],
            "No tokens left to claim"
        );

        if (!auction.auctionFinalized) {
            finalizeAuction(_AuctionId);
        }

        uint256 purchaseTokenDecimals = 18;
        if (address(auction.purchaseToken) != address(0))
            purchaseTokenDecimals = ERC20(auction.purchaseToken).decimals();
        uint256 actualInvestment = calculateTokensMul(
            auction.tokensPurchased[msg.sender],
            auction.lastPrice,
            18,
            auction.token.decimals()
        );
        uint256 overcommitted;

        if (auction.tokensInvested[msg.sender] > actualInvestment) {
            overcommitted =
                auction.tokensInvested[msg.sender] -
                actualInvestment;
            auction.tokensInvested[msg.sender] = actualInvestment;
        }

        if (auction.vestingEnabled) {
            uint256 cyclesPassed = ((block.timestamp - auction.endTime) /
                (auction.vestingPeriod * 1 days)) + 1;

            uint256 toVest;

            if (auction.lastClaimedCycle[msg.sender] == 0) {
                if (cyclesPassed == 1) {
                    toVest =
                        (auction.tokensPurchased[msg.sender] *
                            auction.firstReleasePercentage) /
                        100;
                } else {
                    toVest =
                        ((auction.tokensPurchased[msg.sender] *
                            auction.firstReleasePercentage) / 100) +
                        (((cyclesPassed - 1) *
                            auction.tokensPurchased[msg.sender] *
                            auction.cycleReleasePercentage) / 100);
                }
            } else {
                require(
                    auction.lastClaimedCycle[msg.sender] < cyclesPassed,
                    "Tokens for this cycle already claimed"
                );
                uint256 toVestTotal = (((cyclesPassed - 1) *
                    (auction.tokensPurchased[msg.sender])) / 100) *
                    auction.cycleReleasePercentage;
                toVest = toVestTotal;
            }

            uint256 tokensLeft = auction.tokensPurchased[msg.sender] -
                auction.tokensVested[msg.sender];
            if (toVest > tokensLeft) {
                toVest = tokensLeft;
            }

            require(toVest > 0, "No tokens to claim");
            auction.tokensVested[msg.sender] += toVest;
            auction.token.transfer(msg.sender, toVest);
            auction.lastClaimedCycle[msg.sender] = cyclesPassed;
        } else {
            uint256 tokensToClaim = auction.tokensPurchased[msg.sender] -
                auction.tokensVested[msg.sender];
            auction.tokensVested[msg.sender] += tokensToClaim;
            auction.token.transfer(msg.sender, tokensToClaim);
        }

        if (overcommitted > 0) {
            if (address(auction.purchaseToken) == address(0)) {
                (bool success, ) = payable(msg.sender).call{
                    value: overcommitted
                }("");
                require(success, "Transfer failed");
            } else {
                auction.purchaseToken.transfer(msg.sender, overcommitted);
            }
        }
    }

    function approveAndAddLiquidity(
        address tokenAddress,
        address purchaseTokenAddress,
        uint amountToken,
        uint amountPurchaseToken,
        address routerAddress
    ) private {
        IERC20(tokenAddress).approve(routerAddress, amountToken);
        if (purchaseTokenAddress != WMATIC) {
            IERC20(purchaseTokenAddress).approve(
                routerAddress,
                amountPurchaseToken
            );
            IUniswapV2Router02(routerAddress).addLiquidity(
                tokenAddress,
                purchaseTokenAddress,
                amountToken,
                amountPurchaseToken,
                0,
                0,
                address(this),
                block.timestamp + 360
            );
        } else {
            IUniswapV2Router02(routerAddress).addLiquidityETH{
                value: amountPurchaseToken
            }(
                tokenAddress,
                amountToken,
                amountToken,
                amountPurchaseToken,
                address(this),
                block.timestamp + 360
            );
        }
    }

    function getPairAndLockTokens(
        address tokenAddress,
        address purchaseTokenAddress,
        uint unlockTime
    ) private {
        address pair = uniswapV2Factory.getPair(
            tokenAddress,
            purchaseTokenAddress
        );
        uint pairBalance = IERC20(pair).balanceOf(address(this));
        IERC20(pair).approve(address(tokenLock), pairBalance);
        tokenLock.lockTokens(
            pair,
            msg.sender,
            pairBalance,
            unlockTime,
            false,
            0,
            0,
            0
        );
    }

    function handleAfterSale(uint256 _AuctionId) external {
        AuctionStruct storage auction = Auctions[_AuctionId];

        require(
            msg.sender == auction.creator,
            "Only the auction creator can call"
        );
        require(block.timestamp > auction.endTime, "auction has not ended yet");
        require(
            auction.moneyRaised >= auction.softCap,
            "auction was unsuccessful"
        );
        require(!auction.burnedOrRefunded, "This action has already been done");
        if (!auction.auctionFinalized) {
            finalizeAuction(_AuctionId);
        }

        auction.burnedOrRefunded = true;

        uint256 unsoldTokens = (auction.tokensToSell) - auction.tokensSold;
        if (unsoldTokens != 0) {
            if (auction.burnOrRefund) {
                auction.token.transfer(auction.creator, unsoldTokens);
            } else {
                auction.token.transfer(
                    0x000000000000000000000000000000000000dEaD,
                    unsoldTokens
                );
            }
        }

        uint256 fundsToCollect = auction.actualMoneyRaised -
            auction.devCommission;
        require(fundsToCollect > 0, "No funds to collect");

        if (address(auction.purchaseToken) != address(0)) {
            approveAndAddLiquidity(
                address(auction.token),
                address(auction.purchaseToken),
                auction.listingAmount,
                fundsToCollect,
                address(uniswapV2Router)
            );
            getPairAndLockTokens(
                address(auction.token),
                address(auction.purchaseToken),
                auction.liquidityUnlockTime
            );
        } else {
            approveAndAddLiquidity(
                address(auction.token),
                WMATIC,
                auction.listingAmount,
                fundsToCollect,
                address(uniswapV2RouterETH)
            );
            getPairAndLockTokens(
                address(auction.token),
                WMATIC,
                auction.liquidityUnlockTime
            );
        }
    }

    function collectDevCommission(uint256 _AuctionId) external onlyOwner {
        AuctionStruct storage auction = Auctions[_AuctionId];

        require(block.timestamp > auction.endTime, "auction has not ended yet");
        require(auction.moneyRaised >= auction.softCap, "SoftCap not reached");
        require(auction.auctionFinalized, "Auction hasn't been finalized yet");

        uint256 commission = auction.devCommission;
        auction.devCommission = 0;

        if (auction.devFeeInToken) {
            uint commisionInToken = auction.devCommissionInToken;
            auction.devCommissionInToken = 0;
            auction.token.transfer(owner(), commisionInToken);
        }

        if (address(auction.purchaseToken) == address(0)) {
            (bool success, ) = payable(owner()).call{value: commission}("");
            require(success, "Transfer failed");
        } else {
            auction.purchaseToken.transfer(owner(), commission);
        }
    }
}
