// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "./AntiBotToken.sol";

contract AntiBotTokenFactory {
    // Hardcoded address
    // IAntiBotFactory constant _antiBotFactory = IAntiBotFactory(0xb8FE54d29dfA41BE4cdf679aE125d9946cf2cB27);

    function createToken(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _initialSupply,
        IAntiBotFactory _antiBotFactory,
        uint256 _maxAmount,
        uint256 _amountToAdd,
        uint256 _time,
        uint256 _blockNumberToDisable
    ) external returns (address) {
        AntiBotToken newToken = new AntiBotToken(
            _name,
            _symbol,
            _decimals,
            _initialSupply,
            _antiBotFactory
        );
        newToken.configureAntiBot(
            _maxAmount,
            _amountToAdd,
            _time,
            _blockNumberToDisable
        );
        newToken.transfer(msg.sender, newToken.balanceOf(address(this)));
        newToken.transferOwnership(msg.sender);
        return address(newToken);
    }
}
