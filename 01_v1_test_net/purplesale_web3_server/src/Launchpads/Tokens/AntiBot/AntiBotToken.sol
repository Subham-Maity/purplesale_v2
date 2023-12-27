// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IAntiBot {
    function _checkTransfer(
        address sender,
        address recipient,
        uint256 amount
    ) external;

    function configureAntiBot(
        uint256 _maxAmount,
        uint256 _amountToAdd,
        uint256 _time,
        uint256 _blockNumber
    ) external;

    function isBlacklisted(address _address) external view returns (bool);

    function toggleBlacklist(address _address) external;

    function isAntiBotEnabled() external view returns (bool);

    function toggleAntiBot() external;
}

interface IAntiBotFactory {
    function createAntiBot() external returns (address);
}

contract AntiBotToken is ERC20, Ownable {
    uint8 private _decimals;
    IAntiBot public antiBot;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 decimals_,
        uint256 _initialSupply,
        IAntiBotFactory _antiBotFactory
    ) ERC20(_name, _symbol) {
        _decimals = decimals_;
        _mint(msg.sender, _initialSupply * 10 ** uint256(_decimals));
        address antiBotAddress = _antiBotFactory.createAntiBot();
        antiBot = IAntiBot(antiBotAddress);
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function configureAntiBot(
        uint256 _maxAmount,
        uint256 _amountToAdd,
        uint256 _time,
        uint256 _blockNumberToDisable
    ) external onlyOwner {
        antiBot.configureAntiBot(
            _maxAmount,
            _amountToAdd,
            _time,
            _blockNumberToDisable
        );
    }

    function isBlacklisted(address _address) external view returns (bool) {
        return antiBot.isBlacklisted(_address);
    }

    function toggleBlacklist(address _address) external onlyOwner {
        antiBot.toggleBlacklist(_address);
    }

    function isAntiBotEnabled() external view returns (bool) {
        return antiBot.isAntiBotEnabled();
    }

    function toggleAntiBot() external onlyOwner {
        antiBot.toggleAntiBot();
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        antiBot._checkTransfer(from, to, amount);
        _transfer(from, to, amount);
        return true;
    }

    function transfer(
        address to,
        uint256 amount
    ) public override returns (bool) {
        address owner = _msgSender();
        antiBot._checkTransfer(owner, to, amount);
        _transfer(owner, to, amount);
        return true;
    }
}
