// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/Launchpads/CustomERC20V2.sol";
import "../src/Launchpads/FairLaunch.sol";

contract FairLaunchTestV2 is Test {
    FairLaunch fairLaunch;
    CustomERC20 token;
    CustomERC20 purchaseToken;
    address bob = address(0x1);
    address alice = address(0x2);
    address xlazer = address(0x3);
    address xlazer2 = address(0x4);

    function setUp() public virtual {
        deal(bob, 10 ether);
        vm.prank(bob);
        fairLaunch = new FairLaunch();

        deal(alice, 10 ether);
        vm.prank(alice);
        token = new CustomERC20("Test Token", "TT", 18, 10);

        deal(xlazer, 10 ether);
        vm.prank(xlazer);
        purchaseToken = new CustomERC20("Purchase Token", "PT", 8, 10);

        deal(xlazer2, 10 ether);
    }

    //using native token as purchase token
    function createLaunchV2Ether(
        uint256 _affiliateRate,
        bool _devFeeInToken
    ) public {
        bool _whitelistedEnabled = false;
        uint256 _softCap = 2.5 * 10 ** 18;
        uint256 _tokensToSell = 10 * 10 ** 18;
        uint256 _maxBuy = 5 * 10 ** 18;
        uint256 _startTime = block.timestamp + 1 hours;
        uint256 _endTime = _startTime + 1 weeks;
        uint256 _liquidityAdditionPercent = 60;
        uint256 _liquidityUnlockTime = 30 days;

        vm.startPrank(alice);
        token.mint(alice, 6 * 1e18);
        if (_devFeeInToken) token.mint(alice, 0.2 * 1e18);
        token.approve(address(fairLaunch), token.balanceOf(alice));
        fairLaunch.createLaunch{value: 1 ether}(
            address(token),
            address(0),
            _whitelistedEnabled,
            _devFeeInToken,
            _softCap,
            _tokensToSell,
            _maxBuy,
            _startTime,
            _endTime,
            _affiliateRate,
            _liquidityAdditionPercent,
            _liquidityUnlockTime
        );

        assertEq(bob.balance, 11 ether);
        assertEq(token.balanceOf(address(alice)), 0);
        vm.stopPrank();
    }

    //test for buying token & refund investment
    function testCreateLaunchV2Ether1() public {
        createLaunchV2Ether(0, false);

        vm.startPrank(xlazer);
        vm.warp(2 hours);
        fairLaunch.buyToken{value: 1 ether}(0, 1e18, address(0));
        assertEq(xlazer.balance, 9 ether);

        vm.warp(2 weeks);
        fairLaunch.refundInvestment(0);
        assertEq(xlazer.balance, 10 ether);
        vm.stopPrank();

        vm.prank(alice);
        fairLaunch.refundInvestment(0);
        assertEq(token.balanceOf(alice), 16e18);
    }

    //test for multiple user buying, claiming tokens, handle after sale, dev commision
    function testCreateLaunchV2Ether2() public {
        createLaunchV2Ether(0, false);
        vm.warp(2 hours);
        vm.prank(xlazer);
        fairLaunch.buyToken{value: 1 ether}(0, 1e18, address(0));

        vm.prank(xlazer2);
        fairLaunch.buyToken{value: 2 ether}(0, 2e18, address(0));
        assertEq(xlazer2.balance, 8 ether);

        vm.warp(2 weeks);
        vm.prank(xlazer);
        fairLaunch.claimTokens(0);
        assertGt(token.balanceOf(xlazer), 3.3 * 1e18);

        vm.prank(xlazer2);
        fairLaunch.claimTokens(0);
        assertGt(token.balanceOf(xlazer2), 6.6 * 1e18);

        vm.prank(alice);
        fairLaunch.handleAfterSale(0);
        assertEq(alice.balance, 11.85 ether);
        assertEq(token.balanceOf(alice), 0);

        vm.prank(bob);
        fairLaunch.collectDevCommission(0);
        assertEq(bob.balance, 11.15 ether);
    }

    //test for affiliate commission & alt fee option
    function testCreateLaunchV2Ether3() public {
        createLaunchV2Ether(5, true);
        vm.warp(2 hours);
        vm.startPrank(xlazer);
        fairLaunch.buyToken{value: 1 ether}(0, 1e18, address(0));
        fairLaunch.buyToken{value: 2 ether}(0, 2e18, xlazer2);

        vm.warp(2 weeks);
        fairLaunch.claimTokens(0);
        assertGt(token.balanceOf(xlazer), 3.3 * 1e18);
        vm.stopPrank();

        vm.prank(alice);
        fairLaunch.handleAfterSale(0);
        assertEq(alice.balance, 11.84 ether);

        vm.startPrank(bob);
        fairLaunch.collectDevCommission(0);
        assertEq(bob.balance, 11.06 ether);
        assertEq(token.balanceOf(bob), 0.2 * 1e18);
        vm.stopPrank();

        vm.prank(xlazer2);
        fairLaunch.collectAffiliateCommission(0);
        assertEq(xlazer2.balance, 10.1 ether);
    }

    //using purcahse token
    function createLaunchV2PT(
        uint256 _affiliateRate,
        bool _devFeeInToken
    ) public {
        bool _whitelistedEnabled = true;
        uint256 _softCap = 5 * 10 ** 8;
        uint256 _tokensToSell = 10 * 10 ** 18;
        uint256 _maxBuy = 10 * 10 ** 8;
        uint256 _startTime = block.timestamp + 1 hours;
        uint256 _endTime = _startTime + 1 weeks;
        uint256 _liquidityAdditionPercent = 60;
        uint256 _liquidityUnlockTime = 30 days;

        vm.startPrank(alice);
        token.mint(alice, 6 * 1e18);
        if (_devFeeInToken) token.mint(alice, 0.2 * 1e18);
        token.approve(address(fairLaunch), token.balanceOf(alice));
        fairLaunch.createLaunch{value: 1 ether}(
            address(token),
            address(purchaseToken),
            _whitelistedEnabled,
            _devFeeInToken,
            _softCap,
            _tokensToSell,
            _maxBuy,
            _startTime,
            _endTime,
            _affiliateRate,
            _liquidityAdditionPercent,
            _liquidityUnlockTime
        );

        assertEq(bob.balance, 11 ether);
        assertEq(token.balanceOf(address(alice)), 0);
        vm.stopPrank();
    }

    //test for buying token, whitelisting & refund investment
    function testCreateLaunchV2PT1() public {
        createLaunchV2PT(0, true);
        vm.prank(alice);
        fairLaunch.whitelistAddress(0, xlazer);

        vm.startPrank(xlazer);
        vm.warp(2 hours);
        purchaseToken.approve(address(fairLaunch), 1 * 1e8);
        fairLaunch.buyToken(0, 1e8, address(0));
        assertEq(purchaseToken.balanceOf(xlazer), 9e8);

        vm.warp(2 weeks);
        fairLaunch.refundInvestment(0);
        assertEq(purchaseToken.balanceOf(xlazer), 10e8);
        vm.stopPrank();

        vm.prank(alice);
        fairLaunch.refundInvestment(0);
        assertEq(token.balanceOf(alice), 16.2e18);
    }

    // test for whitelisting, multiple user buying, claiming tokens, handle after sale & dev commision
    function testCreateLaunchV2PT2() public {
        createLaunchV2PT(0, false);
        vm.startPrank(alice);
        fairLaunch.whitelistAddress(0, xlazer);
        fairLaunch.whitelistAddress(0, xlazer2);
        vm.stopPrank();

        vm.warp(2 hours);
        vm.startPrank(xlazer);
        purchaseToken.approve(address(fairLaunch), 4 * 1e8);
        fairLaunch.buyToken(0, 4e8, address(0));
        purchaseToken.transfer(xlazer2, 5e8);
        vm.stopPrank();

        vm.startPrank(xlazer2);
        purchaseToken.approve(address(fairLaunch), 5 * 1e8);
        fairLaunch.buyToken(0, 5e8, address(0));
        assertEq(purchaseToken.balanceOf(xlazer2), 0);
        vm.stopPrank();

        vm.warp(2 weeks);
        vm.prank(xlazer);
        fairLaunch.claimTokens(0);
        assertGt(token.balanceOf(xlazer), 4.4 * 1e18);

        vm.warp(2 weeks + 30 days);
        vm.prank(xlazer2);
        fairLaunch.claimTokens(0);
        assertGt(token.balanceOf(xlazer2), 5.5 * 1e18);

        vm.prank(alice);
        fairLaunch.handleAfterSale(0);
        assertEq(purchaseToken.balanceOf(alice), 8.55 * 1e8);
        assertEq(token.balanceOf(alice), 0);

        vm.prank(bob);
        fairLaunch.collectDevCommission(0);
        assertEq(purchaseToken.balanceOf(bob), 0.45 * 1e8);
    }

    //test for affiliate commission & alt fee option
    function testCreateLaunchV2PT3() public {
        createLaunchV2PT(5, true);
        vm.prank(alice);
        fairLaunch.whitelistAddress(0, xlazer);

        vm.warp(2 hours);
        vm.startPrank(xlazer);
        purchaseToken.approve(address(fairLaunch), 10 * 1e8);
        fairLaunch.buyToken(0, 4e8, address(0));
        fairLaunch.buyToken(0, 6e8, xlazer2);

        vm.warp(2 weeks + 240 days);
        fairLaunch.claimTokens(0);
        assertEq(token.balanceOf(xlazer), 10 * 1e18);
        vm.stopPrank();

        vm.prank(alice);
        fairLaunch.handleAfterSale(0);
        assertEq(purchaseToken.balanceOf(alice), 9.5 * 1e8);

        vm.startPrank(bob);
        fairLaunch.collectDevCommission(0);
        assertEq(purchaseToken.balanceOf(bob), 0.2 * 1e8);
        assertEq(token.balanceOf(bob), 0.2 * 1e18);
        vm.stopPrank();

        vm.prank(xlazer2);
        fairLaunch.collectAffiliateCommission(0);
        assertEq(purchaseToken.balanceOf(xlazer2), 0.3 * 1e8);
    }
}
