// SPDX-License-Identifier: MIT
import "./AntiBot.sol";

pragma solidity 0.8.19;

contract AntiBotFactory {
    mapping(address => bool) public deployedAntiBots;

    function isAntiBot(address _addr) external view returns (bool) {
        return deployedAntiBots[_addr];
    }

    function createAntiBot() public returns (address) {
        AntiBot antiBot = new AntiBot();
        antiBot.transferOwnership(msg.sender);
        deployedAntiBots[msg.sender] = true;
        return address(antiBot);
    }
}
