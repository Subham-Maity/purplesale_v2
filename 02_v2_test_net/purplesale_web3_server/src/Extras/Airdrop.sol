// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Airdrop {
    struct AirdropData {
        ERC20 token;
        uint256 totalAllocated;
        uint256 startTime;
        bool isVesting;
        uint256 firstReleasePercentage;
        uint256 vestingPeriodInDays;
        uint256 cycleReleasePercentage;
        address[] investors;
        uint256[] currentAllocations;
        uint256[] claimed;
        mapping(address => uint256) investorIndex;
        mapping(address => uint256) allocations;
    }

    AirdropData[] public airdrops;
    uint256 public totalInvestors;
    mapping(address => uint256[]) private userAirdrops;
    mapping(address => uint256[]) private userInvested;

    function returnLength() external view returns (uint256) {
        return airdrops.length;
    }

    function getAirdropInvestors(
        uint256 _airdropId
    ) external view returns (address[] memory, uint256[] memory) {
        AirdropData storage airdrop = airdrops[_airdropId];
        return (airdrop.investors, airdrop.currentAllocations);
    }

    function getTotalInvestors() external view returns (uint256) {
        return (totalInvestors);
    }

    function getUserAirdops(
        address _user
    ) external view returns (uint256[] memory) {
        return userAirdrops[_user];
    }

    function getUserInvested(
        address _user
    ) external view returns (uint256[] memory) {
        return userInvested[_user];
    }

    function getAllocation(
        uint256 _airdropId,
        address _user
    ) external view returns (uint256) {
        AirdropData storage airdrop = airdrops[_airdropId];
        return airdrop.allocations[_user];
    }

    function getClaimed(
        uint256 _airdropId,
        address _user
    ) external view returns (uint256) {
        AirdropData storage airdrop = airdrops[_airdropId];
        uint256 investorIndex = airdrop.investorIndex[_user];
        return airdrop.claimed[investorIndex];
    }

    function createAirdrop(
        address _tokenAddress,
        address[] memory _addresses,
        uint256[] memory _amounts,
        uint256 _startTime,
        bool _isVesting,
        uint256 _firstReleasePercentage,
        uint256 _vestingPeriodInDays,
        uint256 _cycleReleasePercentage
    ) public payable {
        require(
            _addresses.length == _amounts.length,
            "Addresses and amounts length mismatch"
        );
        require(_startTime >= block.timestamp, "Start Time can't be in past");
        require(
            _firstReleasePercentage + _cycleReleasePercentage <= 100,
            "Invalid Release %"
        );
        // require(msg.value == 1 ether, "Creation fee invalid");

        uint256 totalTokensRequired = 0;
        for (uint256 i = 0; i < _amounts.length; i++) {
            totalTokensRequired += _amounts[i];
        }
        ERC20 token = ERC20(_tokenAddress);
        require(
            token.allowance(msg.sender, address(this)) >= totalTokensRequired,
            "Check the token allowance"
        );

        token.transferFrom(msg.sender, address(this), totalTokensRequired);

        airdrops.push();
        AirdropData storage newAirdrop = airdrops[airdrops.length - 1];
        newAirdrop.token = token;
        newAirdrop.totalAllocated = totalTokensRequired;
        newAirdrop.startTime = _startTime;
        newAirdrop.isVesting = _isVesting;
        newAirdrop.firstReleasePercentage = _firstReleasePercentage;
        newAirdrop.vestingPeriodInDays = _vestingPeriodInDays;
        newAirdrop.cycleReleasePercentage = _cycleReleasePercentage;
        for (uint256 i = 0; i < _addresses.length; i++) {
            newAirdrop.investors.push(_addresses[i]);
            newAirdrop.currentAllocations.push(_amounts[i]);
            newAirdrop.claimed.push(0);
            newAirdrop.investorIndex[_addresses[i]] = i;
            newAirdrop.allocations[_addresses[i]] = _amounts[i];
            userInvested[_addresses[i]].push(airdrops.length - 1);
        }
        totalInvestors += _addresses.length;
        userAirdrops[msg.sender].push(airdrops.length - 1);
    }

    function claim(uint256 _airdropId) public {
        AirdropData storage airdrop = airdrops[_airdropId];
        require(block.timestamp >= airdrop.startTime, "Airdrop not started");
        uint256 investorIndex = airdrop.investorIndex[msg.sender];
        require(
            airdrop.currentAllocations[investorIndex] > 0,
            "Nothing to claim"
        );

        uint256 claimable;
        if (airdrop.isVesting) {
            if (airdrop.claimed[investorIndex] == 0) {
                claimable =
                    (airdrop.currentAllocations[investorIndex] *
                        airdrop.firstReleasePercentage) /
                    100;
            } else {
                uint256 daysSinceStart = (block.timestamp - airdrop.startTime) /
                    60 /
                    60 /
                    24;
                uint256 cyclesSinceStart = daysSinceStart /
                    airdrop.vestingPeriodInDays;
                claimable =
                    (airdrop.currentAllocations[investorIndex] *
                        airdrop.cycleReleasePercentage *
                        cyclesSinceStart) /
                    100 -
                    airdrop.claimed[investorIndex];
            }
        } else {
            claimable = airdrop.currentAllocations[investorIndex];
        }

        require(claimable > 0, "No tokens available to claim");

        airdrop.token.transfer(msg.sender, claimable);
        airdrop.claimed[investorIndex] += claimable;
        airdrop.currentAllocations[investorIndex] -= claimable;
    }
}
