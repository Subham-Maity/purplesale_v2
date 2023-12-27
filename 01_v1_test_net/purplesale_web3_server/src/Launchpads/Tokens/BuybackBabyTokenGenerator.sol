// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./BuybackBabyToken.sol";

contract BabyTokenFactory {
    function createToken(
        string memory name_,
        string memory symbol_,
        uint256 totalSupply_,
        address rewardToken_,
        address router_,
        uint256[5] memory feeSettings_,
        address serviceFeeReceiver_,
        uint256 serviceFee_
    ) external payable returns (address) {
        BuybackBabyToken newToken = new BuybackBabyToken(
            name_,
            symbol_,
            totalSupply_,
            rewardToken_,
            router_,
            feeSettings_,
            serviceFeeReceiver_,
            serviceFee_,
            msg.sender
        );
        newToken.transfer(msg.sender, newToken.balanceOf(address(this)));
        newToken.transferOwnership(payable(msg.sender));
        return address(newToken);
    }
}
