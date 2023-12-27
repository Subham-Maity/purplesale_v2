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

contract Presale is Ownable {
    struct PresaleStruct {
        ERC20 token;
        ERC20 purchaseToken;
        address creator;
        bool whitelistedEnabled;
        bool burnOrRefund;
        bool burnedOrRefunded;
        bool vestingEnabled;
        bool devFeeInToken;
        uint256 softCap;
        uint256 hardCap;
        uint256 presaleRate;
        uint256 moneyRaised;
        uint256 tokensSold;
        uint256 devCommission;
        uint256 devCommissionInToken;
        uint256 affiliateCommissionAmount;
        uint256 minBuy;
        uint256 maxBuy;
        uint256 startTime;
        uint256 endTime;
        uint256 affiliateRate;
        uint256 firstReleasePercentage;
        uint256 vestingPeriod;
        uint256 cycleReleasePercentage;
        uint256 liquidityAdditionPercent;
        uint256 liquidityUnlockTime;
        uint256 listingRate;
        uint256 listingAmount;
        mapping(address => bool) whitelisted;
        mapping(address => uint256) tokensPurchased;
        mapping(address => uint256) tokensInvested;
        mapping(address => uint256) affiliateCommission;
        mapping(address => uint256) tokensVested;
        mapping(address => uint256) lastClaimedCycle;
    }

    uint256 public devFeeInTokenPercentage = 2; // 2%
    uint256 public devFee = 5; // 5%
    PresaleStruct[] public presales;
    mapping(address => uint256[]) private userPresales;
    mapping(address => uint256[]) private userInvested;

    IUniswapV2Factory public uniswapV2Factory =
        IUniswapV2Factory(0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32);
    IUniswapV2Router02 public uniswapV2Router =
        IUniswapV2Router02(0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff);
    IUniswapV2Router02 public uniswapV2RouterETH =
        IUniswapV2Router02(0x8954AfA98594b838bda56FE4C12a09D7739D179b);
    address public WMATIC = 0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889;
    ITokenLock tokenLock;

    constructor(address _tokenLock) {
        tokenLock = ITokenLock(_tokenLock);
    }

    function returnLength() external view returns (uint256) {
        return presales.length;
    }

    function getUserPresales(
        address _user
    ) external view returns (uint256[] memory) {
        return userPresales[_user];
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
        if (decimalsA > decimalsB) {
            uint256 differenceInDecimals = decimalsA - decimalsB;
            tokens = amountA * (amountB * (10 ** differenceInDecimals));
        } else if (decimalsA < decimalsB) {
            uint256 differenceInDecimals = decimalsB - decimalsA;
            tokens = (amountA * amountB) / (10 ** differenceInDecimals);
        } else {
            tokens = amountA * amountB;
        }
        return tokens;
    }

    function calculateTokensDiv(
        uint256 amountA,
        uint256 amountB,
        uint256 decimalsA,
        uint256 decimalsB
    ) internal pure returns (uint256) {
        uint256 tokens;
        if (decimalsA > decimalsB) {
            uint256 differenceInDecimals = decimalsA - decimalsB;
            tokens = amountA / (amountB * (10 ** differenceInDecimals));
        } else if (decimalsA < decimalsB) {
            uint256 differenceInDecimals = decimalsB - decimalsA;
            tokens = ((amountA * (10 ** differenceInDecimals)) / amountB);
        } else {
            tokens = amountA / amountB;
        }
        return tokens;
    }

    function createPresale(
        address _tokenAddress,
        address _purchaseTokenAddress,
        bool _whitelistedEnabled,
        bool _burnOrRefund,
        bool _vestingEnabled,
        bool _devFeeInToken,
        uint256 _softCap,
        uint256 _hardCap,
        uint256 _presaleRate,
        uint256 _minBuy,
        uint256 _maxBuy,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _affiliateRate,
        uint256 _firstReleasePercentage,
        uint256 _vestingPeriod,
        uint256 _cycleReleasePercentage,
        uint256 _liquidityAdditionPercent,
        uint256 _liquidityUnlockTime,
        uint256 _listingRate
    ) external payable {
        require(
            _tokenAddress != address(0),
            "tokenAddress can't be zero address"
        );
        require(
            _softCap >= _hardCap / 4,
            "Softcap must be more than 25% of hardcap"
        );
        require(_minBuy < _maxBuy, "Min buy !>= max buy");
        require(_startTime >= block.timestamp, "Start Time can't be in past");
        require(
            _endTime - _startTime <= 30 days,
            "Presale duration can't exceed one month"
        );
        require(_affiliateRate <= 5, "Affiliate Rate can't exceed 5%");
        require(
            _firstReleasePercentage + _cycleReleasePercentage <= 100,
            "Invalid Release %"
        );

        if (_listingRate != 0) {
            require(
                _liquidityUnlockTime >= 30 days,
                "liquidityUnlockTime must be >= 30 days"
            );
            require(
                _liquidityAdditionPercent > 50,
                "_liquidityAdditionPercent must be > 50%"
            );
        }
        // require(msg.value == 1 ether, "Creation fee invalid");

        ERC20 token = ERC20(_tokenAddress);
        uint256 purchaseTokenDecimals = 18;
        if (_purchaseTokenAddress != address(0))
            purchaseTokenDecimals = ERC20(_purchaseTokenAddress).decimals();
        uint amount = calculateTokensMul(
            _presaleRate,
            _hardCap,
            token.decimals(),
            purchaseTokenDecimals
        );

        if (_devFeeInToken) {
            uint256 tokensForDevFee = (amount * devFeeInTokenPercentage) / 100;
            require(
                token.allowance(msg.sender, address(this)) >=
                    tokensForDevFee +
                        amount +
                        ((amount * _liquidityAdditionPercent) / 100),
                "Check the token allowance"
            );
            token.transferFrom(
                msg.sender,
                address(this),
                tokensForDevFee +
                    amount +
                    ((amount * _liquidityAdditionPercent) / 100)
            );
        } else {
            require(
                token.allowance(msg.sender, address(this)) >=
                    amount + ((amount * _liquidityAdditionPercent) / 100),
                "Check the token allowance"
            );
            token.transferFrom(
                msg.sender,
                address(this),
                amount + (amount * _liquidityAdditionPercent) / 100
            );
        }

        (bool success, ) = payable(owner()).call{value: msg.value}("");
        require(success, "Transfer failed");

        presales.push();
        PresaleStruct storage newPresale = presales[presales.length - 1];
        newPresale.token = token;
        newPresale.purchaseToken = ERC20(_purchaseTokenAddress);
        newPresale.creator = msg.sender;
        newPresale.whitelistedEnabled = _whitelistedEnabled;
        newPresale.burnOrRefund = _burnOrRefund;
        newPresale.vestingEnabled = _vestingEnabled;
        newPresale.devFeeInToken = _devFeeInToken;
        newPresale.softCap = _softCap;
        newPresale.hardCap = _hardCap;
        newPresale.presaleRate = _presaleRate;
        newPresale.minBuy = _minBuy;
        newPresale.maxBuy = _maxBuy;
        newPresale.startTime = _startTime;
        newPresale.endTime = _endTime;
        newPresale.affiliateRate = _affiliateRate;
        newPresale.firstReleasePercentage = _firstReleasePercentage;
        newPresale.vestingPeriod = _vestingPeriod;
        newPresale.cycleReleasePercentage = _cycleReleasePercentage;
        newPresale.liquidityAdditionPercent = _liquidityAdditionPercent;
        newPresale.liquidityUnlockTime = _liquidityUnlockTime;
        newPresale.listingRate = _listingRate;
        newPresale.listingAmount = ((amount * _liquidityAdditionPercent) / 100);
        userPresales[msg.sender].push(presales.length - 1);
    }

    function whitelistAddress(uint256 _presaleIndex, address _buyer) external {
        PresaleStruct storage presale = presales[_presaleIndex];
        require(
            presale.whitelistedEnabled == true,
            "Whitelisting is not enabled"
        );
        require(msg.sender == presale.creator, "Only creator can whitelist");
        require(block.timestamp < presale.endTime, "Presale has ended");
        presale.whitelisted[_buyer] = true;
    }

    function buyToken(
        uint256 _presaleIndex,
        uint256 _amount,
        address _affiliate
    ) external payable {
        PresaleStruct storage presale = presales[_presaleIndex];
        require(
            _affiliate != msg.sender,
            "Buyer cannot be their own affiliate"
        );
        require(
            block.timestamp >= presale.startTime &&
                block.timestamp <= presale.endTime,
            "Presale not active"
        );
        if (presale.whitelistedEnabled) {
            require(presale.whitelisted[msg.sender], "Address not whitelisted");
        }
        require(
            _amount >= presale.minBuy && _amount <= presale.maxBuy,
            "Invalid amount"
        );
        require(
            presale.moneyRaised + _amount <= presale.hardCap,
            "Hard cap reached"
        );

        uint256 purchaseTokenDecimals = 18;
        if (address(presale.purchaseToken) != address(0))
            purchaseTokenDecimals = presale.purchaseToken.decimals();

        uint256 tokensToBuy = calculateTokensMul(
            presale.presaleRate,
            _amount,
            presale.token.decimals(),
            purchaseTokenDecimals
        );
        uint256 affiliateShare = (_amount * presale.affiliateRate) / 100;
        uint256 devShare;
        uint256 devShareInToken;
        if (presale.devFeeInToken) {
            devShare = (_amount * devFeeInTokenPercentage) / 100;
            devShareInToken = (tokensToBuy * devFeeInTokenPercentage) / 100;
        } else {
            devShare = (_amount * devFee) / 100;
        }

        if (address(presale.purchaseToken) == address(0)) {
            require(msg.value >= _amount, "Not enough AVAX provided");
        } else {
            require(
                presale.purchaseToken.allowance(msg.sender, address(this)) >=
                    _amount,
                "Check the token allowance"
            );
            presale.purchaseToken.transferFrom(
                msg.sender,
                address(this),
                _amount
            );
        }
        presale.devCommission += devShare;
        if (affiliateShare != 0 && _affiliate != address(0)) {
            presale.affiliateCommissionAmount += affiliateShare;
            presale.affiliateCommission[_affiliate] += affiliateShare;
        }
        if (devShareInToken != 0)
            presale.devCommissionInToken += devShareInToken;
        presale.tokensPurchased[msg.sender] += tokensToBuy;
        presale.tokensInvested[msg.sender] += _amount;
        presale.moneyRaised += _amount;
        presale.tokensSold += tokensToBuy;
        userInvested[msg.sender].push(_presaleIndex);
    }

    function refundInvestment(uint256 _presaleId) external {
        PresaleStruct storage presale = presales[_presaleId];

        require(block.timestamp > presale.endTime, "Presale has not ended yet");
        require(presale.moneyRaised < presale.softCap, "SoftCap was reached");
        if (msg.sender == presale.creator) {
            presale.token.transfer(
                presale.creator,
                presale.token.balanceOf(address(this))
            );
        } else {
            require(
                presale.tokensInvested[msg.sender] > 0,
                "No investment to refund"
            );
            uint256 investmentToRefund = presale.tokensInvested[msg.sender];
            presale.tokensInvested[msg.sender] = 0;

            if (address(presale.purchaseToken) == address(0)) {
                (bool success, ) = payable(msg.sender).call{
                    value: investmentToRefund
                }("");
                require(success, "Transfer failed");
            } else {
                presale.purchaseToken.transfer(msg.sender, investmentToRefund);
            }
        }
    }

    function claimTokens(uint256 _presaleId) external {
        PresaleStruct storage presale = presales[_presaleId];
        require(
            block.timestamp >= presale.endTime,
            "Presale has not ended yet"
        );
        require(presale.moneyRaised >= presale.softCap, "SoftCap not reached");
        require(
            presale.tokensPurchased[msg.sender] >
                presale.tokensVested[msg.sender],
            "No tokens left to claim"
        );

        if (presale.vestingEnabled) {
            uint256 cyclesPassed = ((block.timestamp - presale.endTime) /
                (presale.vestingPeriod * 1 days)) + 1;

            uint256 toVest;

            if (presale.lastClaimedCycle[msg.sender] == 0) {
                if (cyclesPassed == 1) {
                    toVest =
                        (presale.tokensPurchased[msg.sender] *
                            presale.firstReleasePercentage) /
                        100;
                } else {
                    toVest =
                        ((presale.tokensPurchased[msg.sender] *
                            presale.firstReleasePercentage) / 100) +
                        (((cyclesPassed - 1) *
                            presale.tokensPurchased[msg.sender] *
                            presale.cycleReleasePercentage) / 100);
                }
            } else {
                require(
                    presale.lastClaimedCycle[msg.sender] < cyclesPassed,
                    "Tokens for this cycle already claimed"
                );
                uint256 toVestTotal = (((cyclesPassed - 1) *
                    (presale.tokensPurchased[msg.sender])) / 100) *
                    presale.cycleReleasePercentage;
                toVest = toVestTotal;
            }

            uint256 tokensLeft = presale.tokensPurchased[msg.sender] -
                presale.tokensVested[msg.sender];
            if (toVest > tokensLeft) {
                toVest = tokensLeft;
            }

            require(toVest > 0, "No tokens to claim");
            presale.tokensVested[msg.sender] += toVest;
            presale.token.transfer(msg.sender, toVest);
            presale.lastClaimedCycle[msg.sender] = cyclesPassed;
        } else {
            uint256 tokensToClaim = presale.tokensPurchased[msg.sender] -
                presale.tokensVested[msg.sender];
            presale.tokensVested[msg.sender] += tokensToClaim;
            presale.token.transfer(msg.sender, tokensToClaim);
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

    function handleAfterSale(uint256 _presaleId) external {
        PresaleStruct storage presale = presales[_presaleId];

        require(
            msg.sender == presale.creator,
            "Only the presale creator can call"
        );
        require(block.timestamp > presale.endTime, "Presale has not ended yet");
        require(
            presale.moneyRaised >= presale.softCap,
            "Presale was unsuccessful"
        );
        require(!presale.burnedOrRefunded, "This action has already been done");

        presale.burnedOrRefunded = true;

        uint256 purchaseTokenDecimals = 18;
        if (address(presale.purchaseToken) != address(0))
            purchaseTokenDecimals = presale.purchaseToken.decimals();

        uint256 unsoldTokens = calculateTokensMul(
            presale.presaleRate,
            presale.hardCap,
            presale.token.decimals(),
            purchaseTokenDecimals
        ) - presale.tokensSold;

        if (unsoldTokens != 0) {
            if (presale.burnOrRefund) {
                presale.token.transfer(presale.creator, unsoldTokens);
            } else {
                presale.token.transfer(
                    0x000000000000000000000000000000000000dEaD,
                    unsoldTokens
                );
            }
        }

        uint256 fundsToCollect = presale.moneyRaised -
            presale.devCommission -
            presale.affiliateCommissionAmount;
        require(fundsToCollect > 0, "No funds to collect");

        if (presale.listingRate != 0) {
            uint temp = calculateTokensMul(
                presale.listingRate,
                fundsToCollect,
                presale.token.decimals(),
                purchaseTokenDecimals
            );
            if (temp <= presale.listingAmount) {
                if (address(presale.purchaseToken) != address(0)) {
                    approveAndAddLiquidity(
                        address(presale.token),
                        address(presale.purchaseToken),
                        temp,
                        fundsToCollect,
                        address(uniswapV2Router)
                    );
                    getPairAndLockTokens(
                        address(presale.token),
                        address(presale.purchaseToken),
                        presale.liquidityUnlockTime
                    );
                } else {
                    approveAndAddLiquidity(
                        address(presale.token),
                        WMATIC,
                        temp,
                        fundsToCollect,
                        address(uniswapV2RouterETH)
                    );
                    getPairAndLockTokens(
                        address(presale.token),
                        WMATIC,
                        presale.liquidityUnlockTime
                    );
                }
                fundsToCollect = 0;
            } else {
                temp = calculateTokensDiv(
                    presale.listingAmount,
                    presale.listingRate,
                    presale.token.decimals(),
                    purchaseTokenDecimals
                );
                if (address(presale.purchaseToken) != address(0)) {
                    approveAndAddLiquidity(
                        address(presale.token),
                        address(presale.purchaseToken),
                        presale.listingAmount,
                        temp,
                        address(uniswapV2Router)
                    );
                    getPairAndLockTokens(
                        address(presale.token),
                        address(presale.purchaseToken),
                        presale.liquidityUnlockTime
                    );
                } else {
                    approveAndAddLiquidity(
                        address(presale.token),
                        WMATIC,
                        presale.listingAmount,
                        temp,
                        address(uniswapV2RouterETH)
                    );
                    getPairAndLockTokens(
                        address(presale.token),
                        WMATIC,
                        presale.liquidityUnlockTime
                    );
                }
                fundsToCollect = fundsToCollect - temp;
            }
        }

        if (fundsToCollect != 0) {
            if (address(presale.purchaseToken) == address(0)) {
                (bool success, ) = payable(presale.creator).call{
                    value: fundsToCollect
                }("");
                require(success, "Transfer failed");
            } else {
                presale.purchaseToken.transfer(presale.creator, fundsToCollect);
            }
        }
    }

    function collectDevCommission(uint256 _presaleId) external onlyOwner {
        PresaleStruct storage presale = presales[_presaleId];

        require(block.timestamp > presale.endTime, "Presale has not ended yet");
        require(presale.moneyRaised >= presale.softCap, "SoftCap not reached");

        uint256 commission = presale.devCommission;
        presale.devCommission = 0;

        if (presale.devFeeInToken) {
            uint commisionInToken = presale.devCommissionInToken;
            presale.devCommissionInToken = 0;
            presale.token.transfer(owner(), commisionInToken);
        }

        if (address(presale.purchaseToken) == address(0)) {
            (bool success, ) = payable(owner()).call{value: commission}("");
            require(success, "Transfer failed");
        } else {
            presale.purchaseToken.transfer(owner(), commission);
        }
    }

    function collectAffiliateCommission(uint256 _presaleId) external {
        PresaleStruct storage presale = presales[_presaleId];

        require(block.timestamp > presale.endTime, "Presale has not ended yet");
        require(presale.moneyRaised >= presale.softCap, "SoftCap not reached");
        require(
            presale.affiliateCommission[msg.sender] != 0,
            "No Affiliate Commission"
        );

        uint256 commission = presale.affiliateCommission[msg.sender];
        presale.affiliateCommission[msg.sender] = 0;

        if (address(presale.purchaseToken) == address(0)) {
            (bool success, ) = payable(msg.sender).call{value: commission}("");
            require(success, "Transfer failed");
        } else {
            presale.purchaseToken.transfer(msg.sender, commission);
        }
    }
}
