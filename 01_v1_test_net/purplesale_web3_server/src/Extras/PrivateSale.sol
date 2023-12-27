// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateSale is Ownable {
    struct PrivSaleStruct {
        ERC20 purchaseToken;
        address creator;
        bool whitelistedEnabled;
        uint256 softCap;
        uint256 hardCap;
        uint256 moneyRaised;
        uint256 minBuy;
        uint256 maxBuy;
        uint256 startTime;
        uint256 endTime;
        uint256 tokensVested;
        uint256 firstReleasePercentage;
        uint256 vestingPeriod;
        uint256 cycleReleasePercentage;
        mapping(address => bool) whitelisted;
        mapping(address => uint256) tokensInvested;
    }

    PrivSaleStruct[] public privsales;
    mapping(address => uint256[]) private userPrivsales;
    mapping(address => uint256[]) private userInvested;

    function returnLength() external view returns (uint256) {
        return privsales.length;
    }

    function getUserPrivsales(
        address _user
    ) external view returns (uint256[] memory) {
        return userPrivsales[_user];
    }

    function getUserInvested(
        address _user
    ) external view returns (uint256[] memory) {
        return userInvested[_user];
    }

    function createPrivSale(
        address _purchaseTokenAddress,
        bool _whitelistedEnabled,
        uint256 _softCap,
        uint256 _hardCap,
        uint256 _minBuy,
        uint256 _maxBuy,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _firstReleasePercentage,
        uint256 _vestingPeriod,
        uint256 _cycleReleasePercentage
    ) external payable {
        require(
            _softCap >= _hardCap / 2,
            "Softcap must be more than 25% of hardcap"
        );
        require(_minBuy < _maxBuy, "Min buy !>= max buy");
        require(_startTime >= block.timestamp, "Start Time can't be in past");
        require(
            _endTime - _startTime <= 30 days,
            "Presale duration can't exceed one month"
        );
        require(
            _firstReleasePercentage + _cycleReleasePercentage <= 100,
            "Invalid Release %"
        );
        // require(msg.value == 1 ether, "Creation fee invalid");

        privsales.push();
        PrivSaleStruct storage newPrivSale = privsales[privsales.length - 1];
        newPrivSale.purchaseToken = ERC20(_purchaseTokenAddress);
        newPrivSale.creator = msg.sender;
        newPrivSale.whitelistedEnabled = _whitelistedEnabled;
        newPrivSale.softCap = _softCap;
        newPrivSale.hardCap = _hardCap;
        newPrivSale.minBuy = _minBuy;
        newPrivSale.maxBuy = _maxBuy;
        newPrivSale.startTime = _startTime;
        newPrivSale.endTime = _endTime;
        newPrivSale.firstReleasePercentage = _firstReleasePercentage;
        newPrivSale.vestingPeriod = _vestingPeriod;
        newPrivSale.cycleReleasePercentage = _cycleReleasePercentage;
        userPrivsales[msg.sender].push(privsales.length - 1);
    }

    function whitelistAddress(uint256 _privSaleIndex, address _buyer) external {
        PrivSaleStruct storage privsale = privsales[_privSaleIndex];
        require(
            privsale.whitelistedEnabled == true,
            "Whitelisting is not enabled"
        );
        require(msg.sender == privsale.creator, "Only creator can whitelist");
        require(block.timestamp < privsale.endTime, "Presale has ended");
        privsale.whitelisted[_buyer] = true;
    }

    function buyToken(
        uint256 _privSaleIndex,
        uint256 _amount
    ) external payable {
        PrivSaleStruct storage privsale = privsales[_privSaleIndex];
        require(
            block.timestamp >= privsale.startTime &&
                block.timestamp <= privsale.endTime,
            "Presale not active"
        );
        if (privsale.whitelistedEnabled) {
            require(
                privsale.whitelisted[msg.sender],
                "Address not whitelisted"
            );
        }
        require(
            _amount >= privsale.minBuy && _amount <= privsale.maxBuy,
            "Invalid amount"
        );
        require(
            privsale.moneyRaised + _amount <= privsale.hardCap,
            "Hard cap reached"
        );

        if (address(privsale.purchaseToken) == address(0)) {
            require(msg.value >= _amount, "Not enough AVAX provided");
        } else {
            require(
                privsale.purchaseToken.allowance(msg.sender, address(this)) >=
                    _amount,
                "Check the token allowance"
            );
            privsale.purchaseToken.transferFrom(
                msg.sender,
                address(this),
                _amount
            );
        }
        privsale.tokensInvested[msg.sender] += _amount;
        privsale.moneyRaised += _amount;
        userInvested[msg.sender].push(_privSaleIndex);
    }

    function refundInvestment(uint256 _privSaleIndex) external {
        PrivSaleStruct storage privsale = privsales[_privSaleIndex];

        require(
            block.timestamp > privsale.endTime,
            "privsale has not ended yet"
        );
        require(privsale.moneyRaised < privsale.softCap, "SoftCap was reached");
        require(
            privsale.tokensInvested[msg.sender] > 0,
            "No investment to refund"
        );

        uint256 investmentToRefund = privsale.tokensInvested[msg.sender];
        privsale.tokensInvested[msg.sender] = 0;

        if (address(privsale.purchaseToken) == address(0)) {
            (bool success, ) = payable(msg.sender).call{
                value: investmentToRefund
            }("");
            require(success, "Transfer failed");
        } else {
            privsale.purchaseToken.transfer(msg.sender, investmentToRefund);
        }
    }

    function claimTokens(uint256 _privSaleIndex) external {
        PrivSaleStruct storage privsale = privsales[_privSaleIndex];
        require(
            msg.sender == privsale.creator,
            "Only the privsale creator can call"
        );
        require(
            block.timestamp >= privsale.endTime,
            "privsale has not ended yet"
        );
        require(
            privsale.moneyRaised >= privsale.softCap,
            "SoftCap not reached"
        );
        require(privsale.moneyRaised > 0, "No funds to collect");

        uint256 cyclesPassed = (block.timestamp - privsale.endTime) /
            (privsale.vestingPeriod * 1 days);

        if (cyclesPassed == 0) {
            uint256 toVest = (privsale.moneyRaised *
                privsale.firstReleasePercentage) / 100;
            privsale.tokensVested += toVest;
            if (address(privsale.purchaseToken) == address(0)) {
                (bool success, ) = payable(privsale.creator).call{
                    value: toVest
                }("");
                require(success, "Transfer failed");
            } else {
                privsale.purchaseToken.transfer(privsale.creator, toVest);
            }
        } else {
            uint256 toVestTotal = (cyclesPassed *
                privsale.moneyRaised *
                privsale.cycleReleasePercentage) / 100;
            uint256 toVest = toVestTotal - privsale.tokensVested;
            require(toVest > 0, "No tokens to claim");
            privsale.tokensVested += toVest;
            if (address(privsale.purchaseToken) == address(0)) {
                (bool success, ) = payable(privsale.creator).call{
                    value: toVest
                }("");
                require(success, "Transfer failed");
            } else {
                privsale.purchaseToken.transfer(privsale.creator, toVest);
            }
        }
    }
}
