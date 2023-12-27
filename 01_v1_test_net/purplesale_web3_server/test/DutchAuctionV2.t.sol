// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/Launchpads/CustomERC20V2.sol";
import "../src/Launchpads/DutchAuction.sol";

contract DutchAuctionV2Test is Test {
    Auction auction;
    CustomERC20 token;
    CustomERC20 purchaseToken;
    address bob = address(0x1);
    address alice = address(0x2);
    address xlazer = address(0x3);
    address xlazer2 = address(0x4);

    function setUp() public virtual {
        deal(bob, 10 ether);
        vm.prank(bob);
        auction = new Auction();

        deal(alice, 10 ether);
        vm.prank(alice);
        token = new CustomERC20("Test Token", "TT", 18, 10);

        deal(xlazer, 10 ether);
        vm.prank(xlazer);
        purchaseToken = new CustomERC20("Purchase Token", "PT", 8, 10);

        deal(xlazer2, 10 ether);
    }

    //using native token as purchase token
    function createAuctionV2Ether(bool _devFeeInToken) public {
        bool _whitelistedEnabled = false;
        bool _burnOrRefund = false;
        bool _vestingEnabled = false;
        uint256 _tokensToSell = 10 * 10 ** 18;
        uint256 _minBuy = 0.1 * 10 ** 18;
        uint256 _maxBuy = 10 * 10 ** 18;
        uint256 _decPriceCycle = 10;
        uint256 _startPrice = 2 * 10 ** 18;
        uint256 _endPrice = 1 * 10 ** 18;
        uint256 _startTime = block.timestamp;
        uint256 _endTime = _startTime + 1 hours;
        uint256 _liquidityAdditionPercent = 60;
        uint256 _liquidityUnlockTime = 30 days;
        uint256 _firstReleasePercentage = 0;
        uint256 _vestingPeriod = 0;
        uint256 _cycleReleasePercentage = 0;

        vm.startPrank(alice);
        token.mint(alice, 6 * 1e18);
        if (_devFeeInToken) token.mint(alice, 0.2 * 1e18);
        token.approve(address(auction), token.balanceOf(alice));
        auction.createAuction{value: 1 ether}(
            address(token),
            address(0),
            _whitelistedEnabled,
            _burnOrRefund,
            _vestingEnabled,
            _devFeeInToken,
            _tokensToSell,
            _minBuy,
            _maxBuy,
            _decPriceCycle,
            _startPrice,
            _endPrice,
            _startTime,
            _endTime,
            _liquidityAdditionPercent,
            _liquidityUnlockTime,
            _firstReleasePercentage,
            _vestingPeriod,
            _cycleReleasePercentage
        );

        assertEq(bob.balance, 11 ether);
        assertEq(token.balanceOf(address(alice)), 0);
        vm.stopPrank();
    }

    //test for buying token & refund investment
    function testCreateAuctionV2Ether1() public {
        createAuctionV2Ether(false);

        vm.startPrank(xlazer);
        vm.warp(2 minutes);
        auction.buyToken{value: 1 ether}(0, 1e18);
        assertEq(xlazer.balance, 9 ether);

        vm.warp(2 hours);
        auction.refundInvestment(0);
        assertEq(xlazer.balance, 10 ether);
        vm.stopPrank();

        vm.prank(alice);
        auction.refundInvestment(0);
        assertEq(token.balanceOf(alice), 16e18);
    }

    // test for multiple user buying, claiming tokens, handle after sale, dev commision
    function testCreateAuctionV2Ether2() public {
        createAuctionV2Ether(false);
        vm.warp(1 seconds);
        vm.prank(xlazer);
        auction.buyToken{value: 10 ether}(0, 10e18);

        vm.warp(31 minutes);
        vm.prank(xlazer2);
        auction.buyToken{value: 4.5 ether}(0, 4.5e18);

        vm.warp(2 weeks);
        vm.prank(xlazer);
        auction.claimTokens(0);
        assertEq(token.balanceOf(xlazer), 5 * 1e18);
        assertEq(xlazer.balance, 5 ether);

        vm.prank(xlazer2);
        auction.claimTokens(0);
        assertEq(token.balanceOf(xlazer2), 3 * 1e18);
        assertEq(xlazer2.balance, 7 ether);

        vm.prank(alice);
        auction.handleAfterSale(0);
        assertEq(alice.balance, 16.6 ether);
        assertEq(token.balanceOf(alice), 0);

        vm.prank(bob);
        auction.collectDevCommission(0);
        assertEq(bob.balance, 11.4 ether);
    }

    //test for alt fee option
    function testCreateAuctionV2Ether3() public {
        createAuctionV2Ether(true);
        vm.warp(1 seconds);
        vm.prank(xlazer);
        auction.buyToken{value: 10 ether}(0, 10e18);

        vm.warp(31 minutes);
        vm.prank(xlazer2);
        auction.buyToken{value: 7.5 ether}(0, 7.5e18);

        vm.warp(2 weeks);
        vm.prank(xlazer2);
        auction.claimTokens(0);
        assertEq(token.balanceOf(xlazer2), 5 * 1e18);
        assertEq(xlazer2.balance, 2.5 ether);

        vm.prank(alice);
        auction.handleAfterSale(0);
        assertEq(alice.balance, 23.7 ether);

        vm.prank(bob);
        auction.collectDevCommission(0);
        assertEq(bob.balance, 11.3 ether);
        assertEq(token.balanceOf(bob), 0.2 * 1e18);
    }

    //using purcahse token
    function createAuctionV2PT(bool _devFeeInToken) public {
        bool _whitelistedEnabled = true;
        bool _burnOrRefund = true;
        bool _vestingEnabled = true;
        uint256 _tokensToSell = 10 * 10 ** 18;
        uint256 _minBuy = 0.1 * 10 ** 8;
        uint256 _maxBuy = 10 * 10 ** 8;
        uint256 _decPriceCycle = 10;
        uint256 _startPrice = 2 * 10 ** 8;
        uint256 _endPrice = 1 * 10 ** 8;
        uint256 _startTime = block.timestamp;
        uint256 _endTime = _startTime + 1 hours;
        uint256 _liquidityAdditionPercent = 60;
        uint256 _liquidityUnlockTime = 30 days;
        uint256 _firstReleasePercentage = 20;
        uint256 _vestingPeriod = 30;
        uint256 _cycleReleasePercentage = 10;

        vm.startPrank(alice);
        token.mint(alice, 6 * 1e18);
        if (_devFeeInToken) token.mint(alice, 0.2 * 1e18);
        token.approve(address(auction), token.balanceOf(alice));
        auction.createAuction{value: 1 ether}(
            address(token),
            address(purchaseToken),
            _whitelistedEnabled,
            _burnOrRefund,
            _vestingEnabled,
            _devFeeInToken,
            _tokensToSell,
            _minBuy,
            _maxBuy,
            _decPriceCycle,
            _startPrice,
            _endPrice,
            _startTime,
            _endTime,
            _liquidityAdditionPercent,
            _liquidityUnlockTime,
            _firstReleasePercentage,
            _vestingPeriod,
            _cycleReleasePercentage
        );

        assertEq(bob.balance, 11 ether);
        assertEq(token.balanceOf(address(alice)), 0);
        vm.stopPrank();
    }

    //test for buying token, whitelisting & refund investment
    function testCreateAuctionV2PT1() public {
        createAuctionV2PT(true);
        vm.prank(alice);
        auction.whitelistAddress(0, xlazer);

        vm.startPrank(xlazer);
        vm.warp(2 minutes);
        purchaseToken.approve(address(auction), 1 * 1e8);
        auction.buyToken(0, 1e8);
        assertEq(purchaseToken.balanceOf(xlazer), 9e8);

        vm.warp(2 weeks);
        auction.refundInvestment(0);
        assertEq(purchaseToken.balanceOf(xlazer), 10e8);
        vm.stopPrank();

        vm.prank(alice);
        auction.refundInvestment(0);
        assertEq(token.balanceOf(alice), 16.2e18);
    }

    // test for claiming tokens (vesting), handle after sale & dev commision
    function testCreateAuctionV2PT2() public {
        createAuctionV2PT(false);
        vm.startPrank(alice);
        auction.whitelistAddress(0, xlazer);
        auction.whitelistAddress(0, xlazer2);
        vm.stopPrank();

        vm.warp(1 seconds);
        vm.startPrank(xlazer);
        purchaseToken.approve(address(auction), 10 * 1e8);
        auction.buyToken(0, 10e8);
        purchaseToken.mint(xlazer2, 6e8);
        vm.stopPrank();

        vm.warp(31 minutes);
        vm.startPrank(xlazer2);
        purchaseToken.approve(address(auction), 6 * 1e8);
        auction.buyToken(0, 6e8);
        assertEq(purchaseToken.balanceOf(xlazer2), 0);
        vm.stopPrank();

        vm.warp(2 hours);
        vm.prank(xlazer);
        auction.claimTokens(0);
        assertEq(token.balanceOf(xlazer), 1 * 1e18);
        assertEq(purchaseToken.balanceOf(xlazer), 5 * 1e8);

        vm.warp(2 hours + 30 days);
        vm.prank(xlazer);
        auction.claimTokens(0);
        assertEq(token.balanceOf(xlazer), 1.5 * 1e18);

        vm.warp(2 hours + 240 days);
        vm.prank(xlazer);
        auction.claimTokens(0);
        assertEq(token.balanceOf(xlazer), 5 * 1e18);

        vm.warp(2 hours + 240 days);
        vm.prank(xlazer2);
        auction.claimTokens(0);
        assertEq(token.balanceOf(xlazer2), 4 * 1e18);
        assertEq(purchaseToken.balanceOf(xlazer2), 2 * 1e8);

        vm.prank(alice);
        auction.handleAfterSale(0);
        assertEq(purchaseToken.balanceOf(alice), 8.55 * 1e8);
        assertEq(token.balanceOf(alice), 1 * 1e18);

        vm.prank(bob);
        auction.collectDevCommission(0);
        assertEq(purchaseToken.balanceOf(bob), 0.45 * 1e8);

        assertEq(address(auction).balance, 0 ether);
        assertEq(purchaseToken.balanceOf(address(auction)), 0);
    }

    //test for alt fee option
    function testCreateAuctionV2PT3() public {
        createAuctionV2PT(true);
        vm.startPrank(alice);
        auction.whitelistAddress(0, xlazer);
        auction.whitelistAddress(0, xlazer2);
        vm.stopPrank();

        vm.warp(1 seconds);
        vm.startPrank(xlazer);
        purchaseToken.approve(address(auction), 10 * 1e8);
        auction.buyToken(0, 10e8);
        purchaseToken.mint(xlazer2, 7.5e8);
        vm.stopPrank();

        vm.warp(31 minutes);
        vm.startPrank(xlazer2);
        purchaseToken.approve(address(auction), 7.5 * 1e8);
        auction.buyToken(0, 7.5e8);
        vm.stopPrank();

        vm.warp(2 weeks);
        vm.prank(xlazer2);
        auction.claimTokens(0);
        assertEq(token.balanceOf(xlazer2), 1 * 1e18);
        assertEq(purchaseToken.balanceOf(xlazer2), 0);

        vm.prank(alice);
        auction.handleAfterSale(0);
        assertEq(purchaseToken.balanceOf(alice), 14.7 * 1e8);

        vm.prank(bob);
        auction.collectDevCommission(0);
        assertEq(purchaseToken.balanceOf(bob), 0.3 * 1e8);
        assertEq(token.balanceOf(bob), 0.2 * 1e18);
    }
}
