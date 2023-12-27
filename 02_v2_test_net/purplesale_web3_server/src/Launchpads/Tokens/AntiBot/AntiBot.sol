// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AntiBot is Ownable {
    uint256 public maxTxAmount;
    uint256 public amountToAddPerBlock;
    uint256 public timeLimitPerTrade;
    uint256 public blockNumberToDisable;
    uint256 public startTimestamp;
    bool public antiBotEnabled;
    mapping(address => bool) public blacklist;
    mapping(address => uint256) public lastTradeTimestamp;

    function configureAntiBot(
        uint256 _maxAmount,
        uint256 _amountToAdd,
        uint256 _time,
        uint256 _blockNumber
    ) external onlyOwner {
        require(
            _blockNumber >= 150 || _blockNumber == 0,
            "BlockNumber invalid"
        );
        maxTxAmount = _maxAmount;
        if (_amountToAdd != 0) startTimestamp = block.number;
        amountToAddPerBlock = _amountToAdd;
        timeLimitPerTrade = _time;
        if (_blockNumber != 0)
            blockNumberToDisable = block.number + _blockNumber;
        else blockNumberToDisable = 0;
    }

    function isBlacklisted(address _address) external view returns (bool) {
        return blacklist[_address];
    }

    function toggleBlacklist(address _address) external onlyOwner {
        blacklist[_address] = !blacklist[_address];
    }

    function isAntiBotEnabled() external view returns (bool) {
        return antiBotEnabled;
    }

    function toggleAntiBot() external onlyOwner {
        antiBotEnabled = !antiBotEnabled;
    }

    function _checkTransfer(
        address sender,
        address recipient,
        uint256 amount
    ) external {
        if (
            antiBotEnabled &&
            blockNumberToDisable != 0 &&
            block.number > blockNumberToDisable
        ) antiBotEnabled = false;
        if (antiBotEnabled) {
            require(!blacklist[sender], "Sender is blacklisted");
            require(!blacklist[recipient], "Recipient is blacklisted");
            if (maxTxAmount != 0) {
                uint256 currentMaxTxAmount = maxTxAmount +
                    (block.number - startTimestamp) *
                    amountToAddPerBlock;
                require(
                    amount <= currentMaxTxAmount,
                    "Exceeds current maxTxAmount"
                );
            }
            if (timeLimitPerTrade > 0) {
                require(
                    block.timestamp >=
                        lastTradeTimestamp[sender] + timeLimitPerTrade,
                    "Time limit not reached"
                );
                lastTradeTimestamp[sender] = block.timestamp;
            }
        }
    }
}
