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

contract FairLaunch is Ownable {
    struct FairLaunchStruct {
        ERC20 token;
        ERC20 purchaseToken;
        address creator;
        bool whitelistedEnabled;
        bool fundsCollected;
        bool devFeeInToken;
        uint256 softCap;
        uint256 maxBuy;
        uint256 tokensToSell;
        uint256 moneyRaised;
        uint256 devCommission;
        uint256 affiliateCommissionAmount;
        uint256 liquidityAdditionPercent;
        uint256 liquidityUnlockTime;
        uint256 listingAmount;
        uint256 startTime;
        uint256 endTime;
        uint256 affiliateRate;
        mapping(address => bool) whitelisted;
        mapping(address => uint256) tokensInvested;
        mapping(address => uint256) affiliateCommission;
    }

    uint256 public devFeeInTokenPercentage = 2; // 2%
    uint256 public devFee = 5; // 5%
    FairLaunchStruct[] public fairLaunch;
    mapping(address => uint256[]) private userLaunches;
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
        return fairLaunch.length;
    }

    function getUserLaunches(
        address _user
    ) external view returns (uint256[] memory) {
        return userLaunches[_user];
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

    function createLaunch(
        address _tokenAddress,
        address _purchaseTokenAddress,
        bool _whitelistedEnabled,
        bool _devFeeInToken,
        uint256 _softCap,
        uint256 _tokensToSell,
        uint256 _maxBuy,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _affiliateRate,
        uint256 _liquidityAdditionPercent,
        uint256 _liquidityUnlockTime
    ) external payable {
        require(
            _tokenAddress != address(0),
            "tokenAddress can't be zero address"
        );
        require(_startTime >= block.timestamp, "Start Time can't be in past");
        require(
            _endTime - _startTime <= 30 days,
            "Launch duration can't exceed one month"
        );
        require(_affiliateRate <= 5, "Affiliate Rate can't exceed 5%");
        require(
            _liquidityAdditionPercent > 50 && _liquidityAdditionPercent <= 100,
            "LiquidityAdditionPercent must be in between 51-100%"
        );
        require(
            _liquidityUnlockTime >= 30 days,
            "liquidityUnlockTime must be >= 30 days"
        );

        // require(msg.value == 1 ether, "Creation fee invalid");

        ERC20 token = ERC20(_tokenAddress);

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

        fairLaunch.push();
        FairLaunchStruct storage newLaunch = fairLaunch[fairLaunch.length - 1];
        newLaunch.token = ERC20(_tokenAddress);
        newLaunch.purchaseToken = ERC20(_purchaseTokenAddress);
        newLaunch.creator = msg.sender;
        newLaunch.whitelistedEnabled = _whitelistedEnabled;
        newLaunch.devFeeInToken = _devFeeInToken;
        newLaunch.tokensToSell = _tokensToSell;
        newLaunch.liquidityAdditionPercent = _liquidityAdditionPercent;
        newLaunch.liquidityUnlockTime = _liquidityUnlockTime;
        newLaunch.listingAmount = ((_tokensToSell * _liquidityAdditionPercent) /
            100);
        newLaunch.startTime = _startTime;
        newLaunch.endTime = _endTime;
        newLaunch.softCap = _softCap;
        newLaunch.maxBuy = _maxBuy;
        newLaunch.affiliateRate = _affiliateRate;
        userLaunches[msg.sender].push(fairLaunch.length - 1);
    }

    function whitelistAddress(uint256 _launchIndex, address _buyer) external {
        FairLaunchStruct storage launch = fairLaunch[_launchIndex];
        require(
            launch.whitelistedEnabled == true,
            "Whitelisting is not enabled"
        );
        require(msg.sender == launch.creator, "Only creator can whitelist");
        require(block.timestamp < launch.endTime, "launch has ended");
        launch.whitelisted[_buyer] = true;
    }

    function buyToken(
        uint256 _launchIndex,
        uint256 _amount,
        address _affiliate
    ) external payable {
        FairLaunchStruct storage launch = fairLaunch[_launchIndex];
        require(
            _affiliate != msg.sender,
            "Buyer cannot be their own affiliate"
        );
        require(
            block.timestamp >= launch.startTime &&
                block.timestamp <= launch.endTime,
            "Launch not active"
        );
        if (launch.whitelistedEnabled) {
            require(launch.whitelisted[msg.sender], "Address not whitelisted");
        }
        require(_amount <= launch.maxBuy, "Invalid _amount");

        uint256 devShare;
        if (launch.devFeeInToken) {
            devShare = (_amount * devFeeInTokenPercentage) / 100;
        } else devShare = (_amount * devFee) / 100;
        uint256 affiliateShare = (_amount * launch.affiliateRate) / 100;

        if (address(launch.purchaseToken) == address(0)) {
            require(msg.value >= _amount, "Not enough AVAX provided");
        } else {
            require(
                launch.purchaseToken.allowance(msg.sender, address(this)) >=
                    _amount,
                "Check the token allowance"
            );
            launch.purchaseToken.transferFrom(
                msg.sender,
                address(this),
                _amount
            );
        }

        launch.devCommission += devShare;
        if (affiliateShare != 0 && _affiliate != address(0)) {
            launch.affiliateCommissionAmount += affiliateShare;
            launch.affiliateCommission[_affiliate] += affiliateShare;
        }
        launch.tokensInvested[msg.sender] += _amount;
        launch.moneyRaised += _amount;
        userLaunches[msg.sender].push(fairLaunch.length - 1);
    }

    function refundInvestment(uint256 _launchIndex) external {
        FairLaunchStruct storage launch = fairLaunch[_launchIndex];
        require(
            block.timestamp > launch.endTime,
            "FairLaunch has not ended yet"
        );
        require(launch.moneyRaised < launch.softCap, "SoftCap was reached");

        if (msg.sender == launch.creator) {
            launch.token.transfer(
                launch.creator,
                launch.token.balanceOf(address(this))
            );
        } else {
            require(
                launch.tokensInvested[msg.sender] > 0,
                "No investment to refund"
            );
            uint256 investmentToRefund = launch.tokensInvested[msg.sender];
            launch.tokensInvested[msg.sender] = 0;

            if (address(launch.purchaseToken) == address(0)) {
                (bool success, ) = payable(msg.sender).call{
                    value: investmentToRefund
                }("");
                require(success, "Transfer failed");
            } else {
                launch.purchaseToken.transfer(msg.sender, investmentToRefund);
            }
        }
    }

    function claimTokens(uint256 _launchId) external {
        FairLaunchStruct storage launch = fairLaunch[_launchId];

        require(
            block.timestamp >= launch.endTime,
            "Fairlaunch has not ended yet"
        );
        require(launch.moneyRaised >= launch.softCap, "SoftCap not reached");

        uint256 tokensToClaim = (launch.tokensInvested[msg.sender] *
            launch.tokensToSell) / launch.moneyRaised;
        launch.tokensInvested[msg.sender] = 0;
        launch.token.transfer(msg.sender, tokensToClaim);
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

    function handleAfterSale(uint256 _launchId) external {
        FairLaunchStruct storage launch = fairLaunch[_launchId];

        require(
            msg.sender == launch.creator,
            "Only the launch creator can call"
        );
        require(block.timestamp > launch.endTime, "launch has not ended yet");
        require(
            launch.moneyRaised >= launch.softCap,
            "launch was unsuccessful"
        );
        require(!launch.fundsCollected, "This action has already been done");

        launch.fundsCollected = true;

        uint256 fundsToCollect = launch.moneyRaised -
            launch.devCommission -
            launch.affiliateCommissionAmount;
        require(fundsToCollect > 0, "No funds to collect");

        if (address(launch.purchaseToken) != address(0)) {
            approveAndAddLiquidity(
                address(launch.token),
                address(launch.purchaseToken),
                launch.listingAmount,
                fundsToCollect,
                address(uniswapV2Router)
            );
            getPairAndLockTokens(
                address(launch.token),
                address(launch.purchaseToken),
                launch.liquidityUnlockTime
            );
        } else {
            approveAndAddLiquidity(
                address(launch.token),
                WMATIC,
                launch.listingAmount,
                fundsToCollect,
                address(uniswapV2RouterETH)
            );
            getPairAndLockTokens(
                address(launch.token),
                WMATIC,
                launch.liquidityUnlockTime
            );
        }
        fundsToCollect = 0;
    }

    function collectDevCommission(uint256 _launchIndex) external onlyOwner {
        FairLaunchStruct storage launch = fairLaunch[_launchIndex];

        require(block.timestamp > launch.endTime, "Launch has not ended yet");
        require(launch.moneyRaised >= launch.softCap, "SoftCap not reached");

        uint256 commission = launch.devCommission;
        launch.devCommission = 0;

        if (launch.devFeeInToken) {
            uint commisionInToken = (launch.tokensToSell *
                devFeeInTokenPercentage) / 100;
            launch.token.transfer(owner(), commisionInToken);
        }

        if (address(launch.purchaseToken) == address(0)) {
            (bool success, ) = payable(owner()).call{value: commission}("");
            require(success, "Transfer failed");
        } else {
            launch.purchaseToken.transfer(owner(), commission);
        }
    }

    function collectAffiliateCommission(uint256 _launchId) external {
        FairLaunchStruct storage launch = fairLaunch[_launchId];

        require(block.timestamp > launch.endTime, "launch has not ended yet");
        require(launch.moneyRaised >= launch.softCap, "SoftCap not reached");
        require(
            launch.affiliateCommission[msg.sender] != 0,
            "No Affiliate Commission"
        );

        uint256 commission = launch.affiliateCommission[msg.sender];
        launch.affiliateCommission[msg.sender] = 0;

        if (address(launch.purchaseToken) == address(0)) {
            (bool success, ) = payable(msg.sender).call{value: commission}("");
            require(success, "Transfer failed");
        } else {
            launch.purchaseToken.transfer(msg.sender, commission);
        }
    }
}
