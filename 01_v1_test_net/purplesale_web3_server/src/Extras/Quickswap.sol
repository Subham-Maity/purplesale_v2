// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.6;

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

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IERC20.sol";

contract QuickswapV2 {
    IUniswapV2Factory public uniswapV2Factory =
        IUniswapV2Factory(0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32);
    IUniswapV2Router02 public uniswapV2Router =
        IUniswapV2Router02(0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff);
    IUniswapV2Router02 public uniswapV2RouterETH =
        IUniswapV2Router02(0x8954AfA98594b838bda56FE4C12a09D7739D179b);
    address public WMATIC = 0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889;
    ITokenLock tokenLock;

    constructor(address _tokenLock) {
        tokenLock = ITokenLock(_tokenLock);
    }

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountA,
        uint256 amountB
    ) external {
        IERC20(tokenA).transferFrom(msg.sender, address(this), amountA);
        IERC20(tokenB).transferFrom(msg.sender, address(this), amountB);
        IERC20(tokenA).approve(address(uniswapV2Router), amountA);
        IERC20(tokenB).approve(address(uniswapV2Router), amountB);
        uniswapV2Router.addLiquidity(
            address(tokenA),
            address(tokenB),
            amountA,
            amountB,
            0,
            0,
            address(this),
            block.timestamp + 360
        );
        address pair = uniswapV2Factory.getPair(
            address(tokenA),
            address(tokenB)
        );
        IERC20(pair).approve(
            address(tokenLock),
            IERC20(pair).balanceOf(address(this))
        );
        tokenLock.lockTokens(
            pair,
            msg.sender,
            IERC20(pair).balanceOf(address(this)),
            60,
            false,
            0,
            0,
            0
        );
    }

    function report(
        address tokenA,
        address tokenB
    ) external view returns (address) {
        return uniswapV2Factory.getPair(tokenA, tokenB);
    }

    receive() external payable {}

    function withdrawETH() external {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        payable(msg.sender).transfer(balance);
    }

    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin
    ) external {
        IERC20(token).transferFrom(
            msg.sender,
            address(this),
            amountTokenDesired
        );
        IERC20(token).approve(address(uniswapV2RouterETH), amountTokenDesired);
        uniswapV2RouterETH.addLiquidityETH{value: amountETHMin}(
            token,
            amountTokenDesired,
            amountTokenMin,
            amountETHMin,
            address(this),
            block.timestamp + 360
        );
        address pair = uniswapV2Factory.getPair(address(token), WMATIC);
        IERC20(pair).approve(
            address(tokenLock),
            IERC20(pair).balanceOf(address(this))
        );
        tokenLock.lockTokens(
            pair,
            msg.sender,
            IERC20(pair).balanceOf(address(this)),
            60,
            false,
            0,
            0,
            0
        );
    }
}
