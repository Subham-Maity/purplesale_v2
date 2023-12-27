// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "./StandardToken.sol";

contract StandardTokenFactory {
    function createToken(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _initialSupply
    ) external returns (address) {
        StandardToken newToken = new StandardToken(
            _name,
            _symbol,
            _decimals,
            _initialSupply
        );
        newToken.transfer(msg.sender, newToken.balanceOf(address(this)));
        newToken.transferOwnership(msg.sender);
        return address(newToken);
    }
}
