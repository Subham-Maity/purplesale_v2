// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenLock {
    struct LockInfo {
        IERC20 token;
        address beneficiary;
        uint256 amount;
        uint256 unlockTime;
        uint256 claimedAmount;
        bool vesting;
        uint256 firstReleasePercentage;
        uint256 vestingPeriod;
        uint256 cycleReleasePercentage;
    }

    LockInfo[] public locks;
    mapping(address => uint256[]) private userLocks;

    function returnLength() external view returns (uint256) {
        return locks.length;
    }

    function getUserLocks(
        address _user
    ) external view returns (uint256[] memory) {
        return userLocks[_user];
    }

    function lockTokens(
        address _tokenAddress,
        address _beneficiary,
        uint256 _amount,
        uint256 _lockDuration,
        bool _vesting,
        uint256 _firstReleasePercentage,
        uint256 _vestingPeriodInDays,
        uint256 _cycleReleasePercentage
    ) public {
        require(_amount > 0, "Token amount must be greater than zero");
        require(_lockDuration > 0, "Lock duration must be greater than zero");
        require(
            _firstReleasePercentage + _cycleReleasePercentage <= 100,
            "Invalid Release %"
        );

        IERC20 token = IERC20(_tokenAddress);
        require(
            token.allowance(msg.sender, address(this)) >= _amount,
            "Check the token allowance"
        );
        _vestingPeriodInDays = _vestingPeriodInDays * 1 days;
        token.transferFrom(msg.sender, address(this), _amount);

        locks.push();
        LockInfo storage newLock = locks[locks.length - 1];
        newLock.token = token;
        newLock.beneficiary = _beneficiary;
        newLock.amount = _amount;
        newLock.unlockTime = block.timestamp + _lockDuration;
        newLock.claimedAmount = 0;
        newLock.vesting = _vesting;
        newLock.firstReleasePercentage = _firstReleasePercentage;
        newLock.vestingPeriod = _vestingPeriodInDays;
        newLock.cycleReleasePercentage = _cycleReleasePercentage;
        userLocks[_beneficiary].push(locks.length - 1);
    }

    function claimTokens(uint256 _lockIndex) public {
        LockInfo storage lock = locks[_lockIndex];
        require(lock.beneficiary == msg.sender, "not the beneficiary");
        require(block.timestamp >= lock.unlockTime, "Tokens are locked");

        uint256 claimableAmount;
        if (lock.vesting) {
            if (block.timestamp < lock.unlockTime + lock.vestingPeriod) {
                claimableAmount =
                    (lock.amount * lock.firstReleasePercentage) /
                    100;
            } else {
                uint256 elapsedCycles = (block.timestamp -
                    (lock.unlockTime + lock.vestingPeriod)) /
                    lock.vestingPeriod;
                claimableAmount =
                    (lock.amount *
                        ((lock.firstReleasePercentage) +
                            (elapsedCycles * lock.cycleReleasePercentage))) /
                    100;
            }
        } else {
            claimableAmount = lock.amount;
        }

        require(claimableAmount > lock.claimedAmount, "No tokens to claim");

        uint256 amountToTransfer = claimableAmount - lock.claimedAmount;
        lock.claimedAmount = claimableAmount;

        lock.token.transfer(msg.sender, amountToTransfer);
    }
}
