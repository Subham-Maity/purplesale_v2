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

//@TODO change devfeeintoken when buytoken()

contract Subscription is Ownable {
    struct SubStruct {
        ERC20 token;
        ERC20 purchaseToken;
        address creator;
        bool whitelistedEnabled;
        bool finalizedPool;
        bool devFeeInToken;
        uint256 softCap;
        uint256 hardCap;
        uint256 hardCapPerUser;
        uint256 subRate;
        uint256 listingRate;
        uint256 finHardCap;
        uint256 finMoneyPer;
        uint256 moneyRaised;
        uint256 tokensSold;
        uint256 devCommission;
        uint256 devCommissionInToken;
        uint256 startTime;
        uint256 endTime;
        uint256 liquidityAdditionPercent;
        uint256 liquidityUnlockTime;
        uint256 listingAmount;
        address[] investors;
        mapping(address => bool) whitelisted;
        mapping(address => bool) hasInvested;
        mapping(address => uint256) tokensPurchased;
        mapping(address => uint256) tokensInvested;
        mapping(address => uint256) excessTokensInvested;
    }

    uint256 public devFeeInTokenPercentage = 2; // 2%
    uint256 public devFee = 5; // 5%
    SubStruct[] public subs;
    mapping(address => uint256[]) private userSubs;
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
        return subs.length;
    }

    function getUserSubs(
        address _user
    ) external view returns (uint256[] memory) {
        return userSubs[_user];
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

    function calculateTokens(
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

    function createSub(
        address _tokenAddress,
        address _purchaseTokenAddress,
        bool _whitelistedEnabled,
        bool _devFeeInToken,
        uint256 _softCap,
        uint256 _hardCap,
        uint256 _hardCapPerUser,
        uint256 _subRate,
        uint256 _listingRate,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _liquidityAdditionPercent,
        uint256 _liquidityUnlockTime
    ) external payable {
        require(
            _tokenAddress != address(0),
            "tokenAddress can't be zero address"
        );
        require(
            _softCap >= _hardCap / 2,
            "Softcap must be more than 50% of hardcap"
        );
        require(_startTime >= block.timestamp, "Start Time can't be in past");
        require(
            _endTime - _startTime <= 30 days,
            "Sub duration can't exceed one month"
        );
        require(
            _listingRate < _subRate,
            "Listing Rate can't be greater than Sub Rate"
        );
        require(
            _liquidityUnlockTime >= 30 days,
            "liquidityUnlockTime must be >= 30 days"
        );
        // require(msg.value == 1 ether, "Creation fee invalid");

        ERC20 token = ERC20(_tokenAddress);

        if (_devFeeInToken) {
            uint256 tokensForDevFee = ((_hardCap * devFeeInTokenPercentage) /
                100);
            require(
                token.allowance(msg.sender, address(this)) >=
                    _hardCap +
                        tokensForDevFee +
                        (_listingRate * _hardCap * _liquidityAdditionPercent) /
                        (100 * _subRate),
                "Check the token allowance"
            );
            token.transferFrom(
                msg.sender,
                address(this),
                _hardCap +
                    tokensForDevFee +
                    (_listingRate * _hardCap * _liquidityAdditionPercent) /
                    (100 * _subRate)
            );
        } else {
            require(
                token.allowance(msg.sender, address(this)) >=
                    _hardCap +
                        (_listingRate * _hardCap * _liquidityAdditionPercent) /
                        (100 * _subRate),
                "Check the token allowance"
            );
            token.transferFrom(
                msg.sender,
                address(this),
                _hardCap +
                    (_listingRate * _hardCap * _liquidityAdditionPercent) /
                    (100 * _subRate)
            );
        }
        (bool success, ) = payable(owner()).call{value: msg.value}("");
        require(success, "Transfer failed");

        subs.push();
        SubStruct storage newSub = subs[subs.length - 1];
        newSub.token = ERC20(_tokenAddress);
        newSub.purchaseToken = ERC20(_purchaseTokenAddress);
        newSub.creator = msg.sender;
        newSub.whitelistedEnabled = _whitelistedEnabled;
        newSub.devFeeInToken = _devFeeInToken;
        newSub.softCap = _softCap;
        newSub.hardCap = _hardCap;
        newSub.hardCapPerUser = _hardCapPerUser;
        newSub.subRate = _subRate;
        newSub.listingRate = _listingRate;
        newSub.finHardCap = _hardCap;
        newSub.startTime = _startTime;
        newSub.endTime = _endTime;
        newSub.liquidityAdditionPercent = _liquidityAdditionPercent;
        newSub.liquidityUnlockTime = _liquidityUnlockTime;
        newSub.listingAmount =
            (_listingRate * _hardCap * _liquidityAdditionPercent) /
            (100 * _subRate);
        userSubs[msg.sender].push(subs.length - 1);
    }

    function whitelistAddress(uint256 _subIndex, address _buyer) external {
        SubStruct storage sub = subs[_subIndex];
        require(sub.whitelistedEnabled == true, "Whitelisting is not enabled");
        require(msg.sender == sub.creator, "Only creator can whitelist");
        require(block.timestamp < sub.endTime, "sub has ended");
        sub.whitelisted[_buyer] = true;
    }

    function buyToken(uint256 _subIndex, uint256 _amount) external payable {
        SubStruct storage sub = subs[_subIndex];

        require(
            block.timestamp >= sub.startTime && block.timestamp <= sub.endTime,
            "sub not active"
        );
        if (sub.whitelistedEnabled) {
            require(sub.whitelisted[msg.sender], "Address not whitelisted");
        }

        if (address(sub.purchaseToken) == address(0)) {
            require(msg.value >= _amount, "Not enough AVAX provided");
        } else {
            require(
                sub.purchaseToken.allowance(msg.sender, address(this)) >=
                    _amount,
                "Check the token allowance"
            );
            sub.purchaseToken.transferFrom(msg.sender, address(this), _amount);
        }

        uint256 purchaseTokenDecimals = 18;
        if (address(sub.purchaseToken) != address(0))
            purchaseTokenDecimals = sub.purchaseToken.decimals();

        uint tokensSold = calculateTokens(
            sub.subRate,
            _amount,
            sub.token.decimals(),
            purchaseTokenDecimals
        );

        sub.tokensInvested[msg.sender] += _amount;
        sub.tokensSold += tokensSold;
        if (!sub.hasInvested[msg.sender]) {
            sub.investors.push(msg.sender);
            sub.hasInvested[msg.sender] = true;
        }
        sub.finMoneyPer += _amount;
        sub.moneyRaised += _amount;
        userSubs[msg.sender].push(subs.length - 1);
    }

    function refundInvestment(uint256 _subIndex) external {
        SubStruct storage sub = subs[_subIndex];

        require(block.timestamp > sub.endTime, "Sub has not ended yet");
        require(sub.tokensSold < sub.softCap, "SoftCap was reached");
        if (msg.sender == sub.creator) {
            sub.token.transfer(sub.creator, sub.token.balanceOf(address(this)));
        } else {
            require(
                sub.tokensInvested[msg.sender] > 0,
                "No investment to refund"
            );
            uint256 investmentToRefund = sub.tokensInvested[msg.sender];
            sub.tokensInvested[msg.sender] = 0;

            if (address(sub.purchaseToken) == address(0)) {
                (bool success, ) = payable(msg.sender).call{
                    value: investmentToRefund
                }("");
                require(success, "Transfer failed");
            } else {
                sub.purchaseToken.transfer(msg.sender, investmentToRefund);
            }
        }
    }

    function finalizePool(uint256 _subIndex) external {
        SubStruct storage sub = subs[_subIndex];

        require(block.timestamp > sub.endTime, "Sub has not ended yet");
        require(sub.tokensSold >= sub.softCap, "SoftCap was'nt reached");
        require(sub.finalizedPool == false, "Pool has been finazed already");

        uint256 extraTokens;
        uint256 sumCommitmentRatio;

        for (uint i = 0; i < sub.investors.length; i++) {
            address investor = sub.investors[i];
            uint256 tokens = (sub.tokensInvested[investor] * sub.finHardCap) /
                sub.finMoneyPer;

            if (sub.tokensPurchased[investor] != sub.hardCapPerUser) {
                if (
                    tokens + sub.tokensPurchased[investor] > sub.hardCapPerUser
                ) {
                    extraTokens +=
                        (tokens + sub.tokensPurchased[investor]) -
                        sub.hardCapPerUser;
                    sub.tokensPurchased[investor] = sub.hardCapPerUser;
                } else {
                    sumCommitmentRatio += sub.tokensInvested[investor];
                    sub.tokensPurchased[investor] += tokens;
                }
            }
        }

        if (sumCommitmentRatio == 0 && sub.finHardCap != 0) {
            sub.token.transfer(sub.creator, sub.finHardCap);
            sub.finHardCap = 0;
        }

        sub.finMoneyPer = sumCommitmentRatio;
        sub.finHardCap = extraTokens;

        if (sub.finHardCap == 0) {
            for (uint i = 0; i < sub.investors.length; i++) {
                address investor = sub.investors[i];
                uint256 purchaseTokenDecimals = 18;
                if (address(sub.purchaseToken) != address(0))
                    purchaseTokenDecimals = sub.purchaseToken.decimals();
                uint temp = calculateTokensDiv(
                    sub.tokensPurchased[investor],
                    sub.subRate,
                    sub.token.decimals(),
                    purchaseTokenDecimals
                );
                if (sub.tokensInvested[investor] > temp) {
                    sub.excessTokensInvested[investor] =
                        sub.tokensInvested[investor] -
                        temp;
                    sub.moneyRaised -= sub.excessTokensInvested[investor];
                }
                uint256 devShare;
                if (sub.devFeeInToken) {
                    devShare =
                        ((sub.tokensInvested[investor] -
                            sub.excessTokensInvested[investor]) *
                            devFeeInTokenPercentage) /
                        100;
                    uint256 devShareInToken = (sub.tokensPurchased[investor] *
                        devFeeInTokenPercentage) / 100;
                    sub.devCommissionInToken += devShareInToken;
                } else
                    devShare =
                        ((sub.tokensInvested[investor] -
                            sub.excessTokensInvested[investor]) * devFee) /
                        100;

                sub.devCommission += devShare;
            }
            sub.finalizedPool = true;
        }
    }

    function claimTokens(uint256 _subIndex) external {
        SubStruct storage sub = subs[_subIndex];

        require(block.timestamp >= sub.endTime, "Sub has not ended yet");
        require(sub.tokensSold >= sub.softCap, "SoftCap was'nt reached");
        require(sub.finalizedPool == true, "Pool hasn't been finazed yet");
        require(sub.tokensPurchased[msg.sender] != 0, "No Tokens purchased");

        uint256 purchaseTokenDecimals = 18;
        if (address(sub.purchaseToken) != address(0))
            purchaseTokenDecimals = sub.purchaseToken.decimals();
        uint temp = calculateTokensDiv(
            sub.tokensPurchased[msg.sender],
            sub.subRate,
            sub.token.decimals(),
            purchaseTokenDecimals
        );
        if (sub.tokensInvested[msg.sender] > temp) {
            if (address(sub.purchaseToken) == address(0)) {
                (bool success, ) = payable(msg.sender).call{
                    value: sub.excessTokensInvested[msg.sender]
                }("");
                require(success, "Transfer failed");
            } else {
                sub.purchaseToken.transfer(
                    msg.sender,
                    sub.excessTokensInvested[msg.sender]
                );
            }
        }

        uint256 tokensToClaim = sub.tokensPurchased[msg.sender];
        sub.tokensPurchased[msg.sender] = 0;
        sub.token.transfer(msg.sender, tokensToClaim);
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

    function handleAfterSale(uint256 _subIndex) external {
        SubStruct storage sub = subs[_subIndex];

        require(msg.sender == sub.creator, "Only the sub creator can call");
        require(block.timestamp > sub.endTime, "Sub has not ended yet");
        require(sub.tokensSold >= sub.softCap, "SoftCap was'nt reached");
        require(sub.finalizedPool == true, "Pool hasn't been finazed yet");

        uint256 fundsToCollect = sub.moneyRaised - sub.devCommission;
        require(fundsToCollect > 0, "No funds to collect");

        uint256 purchaseTokenDecimals = 18;
        if (address(sub.purchaseToken) != address(0))
            purchaseTokenDecimals = sub.purchaseToken.decimals();

        uint temp = calculateTokens(
            sub.listingRate,
            fundsToCollect,
            sub.token.decimals(),
            purchaseTokenDecimals
        );
        if (temp <= sub.listingAmount) {
            if (address(sub.purchaseToken) != address(0)) {
                approveAndAddLiquidity(
                    address(sub.token),
                    address(sub.purchaseToken),
                    temp,
                    fundsToCollect,
                    address(uniswapV2Router)
                );
                getPairAndLockTokens(
                    address(sub.token),
                    address(sub.purchaseToken),
                    sub.liquidityUnlockTime
                );
            } else {
                approveAndAddLiquidity(
                    address(sub.token),
                    WMATIC,
                    temp,
                    fundsToCollect,
                    address(uniswapV2RouterETH)
                );
                getPairAndLockTokens(
                    address(sub.token),
                    WMATIC,
                    sub.liquidityUnlockTime
                );
            }
            fundsToCollect = 0;
        } else {
            temp = calculateTokensDiv(
                sub.listingAmount,
                sub.listingRate,
                sub.token.decimals(),
                purchaseTokenDecimals
            );
            if (address(sub.purchaseToken) != address(0)) {
                approveAndAddLiquidity(
                    address(sub.token),
                    address(sub.purchaseToken),
                    sub.listingAmount,
                    temp,
                    address(uniswapV2Router)
                );
                getPairAndLockTokens(
                    address(sub.token),
                    address(sub.purchaseToken),
                    sub.liquidityUnlockTime
                );
            } else {
                approveAndAddLiquidity(
                    address(sub.token),
                    WMATIC,
                    sub.listingAmount,
                    temp,
                    address(uniswapV2RouterETH)
                );
                getPairAndLockTokens(
                    address(sub.token),
                    WMATIC,
                    sub.liquidityUnlockTime
                );
            }
            fundsToCollect = fundsToCollect - temp;
        }

        if (fundsToCollect != 0) {
            if (address(sub.purchaseToken) == address(0)) {
                (bool success, ) = payable(sub.creator).call{
                    value: fundsToCollect
                }("");
                require(success, "Transfer failed");
            } else {
                sub.purchaseToken.transfer(sub.creator, fundsToCollect);
            }
        }
    }

    function collectDevCommission(uint256 _subIndex) external onlyOwner {
        SubStruct storage sub = subs[_subIndex];

        require(block.timestamp > sub.endTime, "Sub has not ended yet");
        require(sub.tokensSold >= sub.softCap, "SoftCap was'nt reached");

        uint256 commission = sub.devCommission;
        sub.devCommission = 0;

        if (sub.devFeeInToken) {
            uint commisionInToken = sub.devCommissionInToken;
            sub.devCommissionInToken = 0;
            sub.token.transfer(owner(), commisionInToken);
        }

        if (address(sub.purchaseToken) == address(0)) {
            (bool success, ) = payable(owner()).call{value: commission}("");
            require(success, "Transfer failed");
        } else {
            sub.purchaseToken.transfer(owner(), commission);
        }
    }
}
