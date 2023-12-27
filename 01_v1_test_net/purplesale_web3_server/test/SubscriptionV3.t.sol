// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/Launchpads/CustomERC20V2.sol";
import "../src/Launchpads/Subscription.sol";

contract SubscriptionTestV3 is Test {
    Subscription sub;
    CustomERC20 token;
    CustomERC20 purchaseToken;
    address bob = address(0x1);
    address alice = address(0x2);
    address xlazer = address(0x3);
    address xlazer2 = address(0x4);
    address xlazer3 = address(0x5);
    address xlazer4 = address(0x6);

    function setUp() public virtual {
        deal(bob, 10 ether);
        vm.prank(bob);
        sub = new Subscription();

        deal(alice, 10 ether);
        vm.prank(alice);
        token = new CustomERC20("Test Token", "TT", 8, 10);

        deal(xlazer, 10 ether);
        vm.prank(xlazer);
        purchaseToken = new CustomERC20("Purchase Token", "PT", 18, 10);

        deal(xlazer2, 10 ether);
        deal(xlazer3, 10 ether);
        deal(xlazer4, 10 ether);
    }

    //using native token as purchase token
    function createSubV3Ether(bool _devFeeInToken) public {
        bool _whitelistedEnabled = false;
        uint256 _softCap = 500 * 10 ** 8;
        uint256 _hardCap = 1000 * 10 ** 8;
        uint256 _hardCapPerUser = 250 * 10 ** 8;
        uint256 _subRate = 100;
        uint256 _listingRate = 1;
        uint256 _startTime = block.timestamp + 1 hours;
        uint256 _endTime = _startTime + 1 weeks;
        uint256 _liquidityAdditionPercent = 60;
        uint256 _liquidityUnlockTime = 30 days;

        vm.startPrank(alice);
        token.mint(alice, 996 * 1e8);
        if (_devFeeInToken) token.mint(alice, 20 * 1e8);
        token.approve(address(sub), token.balanceOf(alice));
        sub.createSub{value: 1 ether}(
            address(token),
            address(0),
            _whitelistedEnabled,
            _devFeeInToken,
            _softCap,
            _hardCap,
            _hardCapPerUser,
            _subRate,
            _listingRate,
            _startTime,
            _endTime,
            _liquidityAdditionPercent,
            _liquidityUnlockTime
        );

        assertEq(bob.balance, 11 ether);
        assertEq(token.balanceOf(address(alice)), 0);
        vm.stopPrank();
    }

    //test for buying token & refund investment
    function testCreateSubV3Ether1() public {
        createSubV3Ether(false);

        vm.startPrank(xlazer);
        vm.warp(2 hours);
        sub.buyToken{value: 1 ether}(0, 1e18);
        assertEq(xlazer.balance, 9 ether);

        vm.warp(2 weeks);
        sub.refundInvestment(0);
        assertEq(xlazer.balance, 10 ether);
        vm.stopPrank();

        vm.prank(alice);
        sub.refundInvestment(0);
        assertEq(token.balanceOf(alice), 1006 * 1e8);
    }

    //test for multiple user buying, claiming tokens, handle after sale, dev commision
    function testCreateSubV3Ether2() public {
        createSubV3Ether(false);
        vm.warp(2 hours);
        vm.prank(xlazer);
        sub.buyToken{value: 3 ether}(0, 3e18);

        vm.prank(xlazer2);
        sub.buyToken{value: 1 ether}(0, 1e18);

        vm.prank(xlazer3);
        sub.buyToken{value: 0.5 ether}(0, 0.5e18);

        vm.prank(xlazer4);
        sub.buyToken{value: 0.5 ether}(0, 0.5e18);

        vm.warp(2 weeks);
        vm.startPrank(xlazer);
        sub.finalizePool(0);
        sub.finalizePool(0);
        sub.finalizePool(0);

        sub.claimTokens(0);
        assertEq(token.balanceOf(xlazer), 250 * 1e8);
        assertEq(xlazer.balance, 7.5 ether);
        vm.stopPrank();

        vm.prank(xlazer2);
        sub.claimTokens(0);
        assertEq(token.balanceOf(xlazer2), 250 * 1e8);

        vm.prank(xlazer3);
        sub.claimTokens(0);
        assertEq(token.balanceOf(xlazer3), 250 * 1e8);

        vm.prank(xlazer4);
        sub.claimTokens(0);
        assertEq(token.balanceOf(xlazer4), 250 * 1e8);

        vm.prank(alice);
        sub.handleAfterSale(0);
        assertEq(alice.balance, 13.275 ether);

        vm.prank(bob);
        sub.collectDevCommission(0);
        assertEq(bob.balance, 11.225 ether);
    }

    //test for alt fee option
    function testCreateSubV3Ether3() public {
        createSubV3Ether(true);
        vm.warp(2 hours);
        vm.prank(xlazer);
        sub.buyToken{value: 3 ether}(0, 3e18);

        vm.prank(xlazer2);
        sub.buyToken{value: 1 ether}(0, 1e18);

        vm.prank(xlazer3);
        sub.buyToken{value: 0.5 ether}(0, 0.5e18);

        vm.prank(xlazer4);
        sub.buyToken{value: 0.5 ether}(0, 0.5e18);

        vm.warp(2 weeks);
        vm.startPrank(xlazer);
        sub.finalizePool(0);
        sub.finalizePool(0);
        sub.finalizePool(0);
        vm.stopPrank();

        vm.prank(alice);
        sub.handleAfterSale(0);
        assertEq(alice.balance, 13.41 ether);

        vm.prank(bob);
        sub.collectDevCommission(0);
        assertEq(bob.balance, 11.09 ether);
        assertEq(token.balanceOf(bob), 20 * 1e8);
    }

    //using purchase token
    function createSubV3PT(bool _devFeeInToken) public {
        bool _whitelistedEnabled = true;
        uint256 _softCap = 500 * 10 ** 8;
        uint256 _hardCap = 1000 * 10 ** 8;
        uint256 _hardCapPerUser = 250 * 10 ** 8;
        uint256 _subRate = 100;
        uint256 _listingRate = 1;
        uint256 _startTime = block.timestamp + 1 hours;
        uint256 _endTime = _startTime + 1 weeks;
        uint256 _liquidityAdditionPercent = 60;
        uint256 _liquidityUnlockTime = 30 days;

        vm.startPrank(alice);
        token.mint(alice, 996 * 1e8);
        if (_devFeeInToken) token.mint(alice, 20 * 1e8);
        token.approve(address(sub), token.balanceOf(alice));
        sub.createSub{value: 1 ether}(
            address(token),
            address(purchaseToken),
            _whitelistedEnabled,
            _devFeeInToken,
            _softCap,
            _hardCap,
            _hardCapPerUser,
            _subRate,
            _listingRate,
            _startTime,
            _endTime,
            _liquidityAdditionPercent,
            _liquidityUnlockTime
        );

        assertEq(bob.balance, 11 ether);
        assertEq(token.balanceOf(address(alice)), 0);
        vm.stopPrank();
    }

    //test for buying token, whitelisting & refund investment
    function testCreateSubV3PT1() public {
        createSubV3PT(true);
        vm.prank(alice);
        sub.whitelistAddress(0, xlazer);

        vm.startPrank(xlazer);
        vm.warp(2 hours);
        purchaseToken.approve(address(sub), 1 * 1e18);
        sub.buyToken(0, 1e18);
        assertEq(purchaseToken.balanceOf(xlazer), 9e18);

        vm.warp(2 weeks);
        sub.refundInvestment(0);
        assertEq(purchaseToken.balanceOf(xlazer), 10e18);
        vm.stopPrank();

        vm.prank(alice);
        sub.refundInvestment(0);
        assertEq(token.balanceOf(alice), 1026 * 1e8);
    }

    //test for multiple user buying, claiming tokens, handle after sale, dev commision
    function testCreateSubV3PT2() public {
        createSubV3PT(false);
        vm.startPrank(alice);
        sub.whitelistAddress(0, xlazer);
        sub.whitelistAddress(0, xlazer2);
        sub.whitelistAddress(0, xlazer3);
        sub.whitelistAddress(0, xlazer4);
        vm.stopPrank();

        vm.warp(2 hours);
        vm.startPrank(xlazer);
        purchaseToken.approve(address(sub), 3 * 1e18);
        sub.buyToken(0, 3e18);
        purchaseToken.mint(xlazer2, 1e18);
        purchaseToken.mint(xlazer3, 0.5e18);
        purchaseToken.mint(xlazer4, 0.5e18);
        vm.stopPrank();

        vm.startPrank(xlazer2);
        purchaseToken.approve(address(sub), 1 * 1e18);
        sub.buyToken(0, 1e18);
        vm.stopPrank();

        vm.startPrank(xlazer3);
        purchaseToken.approve(address(sub), 0.5 * 1e18);
        sub.buyToken(0, 0.5e18);
        vm.stopPrank();

        vm.startPrank(xlazer4);
        purchaseToken.approve(address(sub), 0.5 * 1e18);
        sub.buyToken(0, 0.5e18);
        vm.stopPrank();

        vm.warp(2 weeks);
        vm.startPrank(xlazer);
        sub.finalizePool(0);
        sub.finalizePool(0);
        sub.finalizePool(0);

        sub.claimTokens(0);
        assertEq(token.balanceOf(xlazer), 250 * 1e8);
        assertEq(purchaseToken.balanceOf(xlazer), 7.5 * 1e18);
        vm.stopPrank();

        vm.prank(xlazer2);
        sub.claimTokens(0);
        assertEq(token.balanceOf(xlazer2), 250 * 1e8);

        vm.prank(xlazer3);
        sub.claimTokens(0);
        assertEq(token.balanceOf(xlazer3), 250 * 1e8);

        vm.prank(xlazer4);
        sub.claimTokens(0);
        assertEq(token.balanceOf(xlazer4), 250 * 1e8);

        vm.prank(alice);
        sub.handleAfterSale(0);
        assertEq(purchaseToken.balanceOf(alice), 4.275 * 1e18);

        vm.prank(bob);
        sub.collectDevCommission(0);
        assertEq(purchaseToken.balanceOf(bob), 0.225 * 1e18);
    }

    //test for alt fee option
    function testCreateSubV3PT3() public {
        createSubV3PT(true);
        vm.startPrank(alice);
        sub.whitelistAddress(0, xlazer);
        sub.whitelistAddress(0, xlazer2);
        sub.whitelistAddress(0, xlazer3);
        sub.whitelistAddress(0, xlazer4);
        vm.stopPrank();

        vm.warp(2 hours);
        vm.startPrank(xlazer);
        purchaseToken.approve(address(sub), 3 * 1e18);
        sub.buyToken(0, 3e18);
        purchaseToken.mint(xlazer2, 1e18);
        purchaseToken.mint(xlazer3, 0.5e18);
        purchaseToken.mint(xlazer4, 0.5e18);
        vm.stopPrank();

        vm.startPrank(xlazer2);
        purchaseToken.approve(address(sub), 1 * 1e18);
        sub.buyToken(0, 1e18);
        vm.stopPrank();

        vm.startPrank(xlazer3);
        purchaseToken.approve(address(sub), 0.5 * 1e18);
        sub.buyToken(0, 0.5e18);
        vm.stopPrank();

        vm.startPrank(xlazer4);
        purchaseToken.approve(address(sub), 0.5 * 1e18);
        sub.buyToken(0, 0.5e18);
        vm.stopPrank();

        vm.warp(2 weeks);
        vm.startPrank(xlazer);
        sub.finalizePool(0);
        sub.finalizePool(0);
        sub.finalizePool(0);
        vm.stopPrank();

        vm.prank(alice);
        sub.handleAfterSale(0);
        assertEq(purchaseToken.balanceOf(alice), 4.41 * 1e18);

        vm.prank(bob);
        sub.collectDevCommission(0);
        assertEq(purchaseToken.balanceOf(bob), 0.09 * 1e18);
        assertEq(token.balanceOf(bob), 20 * 1e8);
    }
}
