// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/Launchpads/CustomERC20V2.sol";
import "../src/Launchpads/Presale.sol";

contract PresaleTest is Test {
    Presale presale;
    CustomERC20 token;
    CustomERC20 purchaseToken;
    address bob = address(0x1);
    address alice = address(0x2);
    address xlazer = address(0x3);
    address xlazer2 = address(0x4);

    function setUp() public virtual {
        deal(bob, 10 ether);
        vm.prank(bob);
        presale = new Presale(0x000000000000000000000000000000000000dEaD);

        deal(alice, 10 ether);
        vm.prank(alice);
        token = new CustomERC20("Test Token", "TT", 18, 10);

        deal(xlazer, 10 ether);
        vm.prank(xlazer);
        purchaseToken = new CustomERC20("Purchase Token", "PT", 18, 10);

        deal(xlazer2, 10 ether);
    }

    //using native token as purchase token
    function createPresaleEther(
        uint256 _affiliateRate,
        bool _devFeeInToken
    ) public {
        bool _whitelistedEnabled = false;
        bool _burnOrRefund = false;
        bool _vestingEnabled = false;
        uint256 _softCap = 2.5 * 10 ** 18;
        uint256 _hardCap = 5 * 10 ** 18;
        uint256 _presaleRate = 2;
        uint256 _minBuy = 1 * 10 ** 18;
        uint256 _maxBuy = 5 * 10 ** 18;
        uint256 _startTime = block.timestamp + 1 hours;
        uint256 _endTime = _startTime + 1 weeks;
        uint256 _firstReleasePercentage = 0;
        uint256 _vestingPeriod = 0;
        uint256 _cycleReleasePercentage = 0;
        uint256 _liquidityAdditionPercent;
        uint256 _liquidityUnlockTime;
        uint256 _listingRate;

        vm.startPrank(alice);
        if (_devFeeInToken) token.mint(alice, 0.2 * 1e18);
        token.approve(address(presale), token.balanceOf(alice));
        presale.createPresale{value: 1 ether}(
            address(token),
            address(0),
            _whitelistedEnabled,
            _burnOrRefund,
            _vestingEnabled,
            _devFeeInToken,
            _softCap,
            _hardCap,
            _presaleRate,
            _minBuy,
            _maxBuy,
            _startTime,
            _endTime,
            _affiliateRate,
            _firstReleasePercentage,
            _vestingPeriod,
            _cycleReleasePercentage,
            _liquidityAdditionPercent,
            _liquidityUnlockTime,
            _listingRate
        );

        assertEq(bob.balance, 11 ether);
        assertEq(token.balanceOf(address(alice)), 0);
        vm.stopPrank();
    }

    //test for buying token & refund investment
    function testCreatePresaleEther1() public {
        createPresaleEther(0, false);

        vm.startPrank(xlazer);
        vm.warp(2 hours);
        presale.buyToken{value: 1 ether}(0, 1e18, address(0));
        assertEq(xlazer.balance, 9 ether);

        vm.warp(2 weeks);
        presale.refundInvestment(0);
        assertEq(xlazer.balance, 10 ether);
        vm.stopPrank();

        vm.prank(alice);
        presale.refundInvestment(0);
        assertEq(token.balanceOf(alice), 10e18);
    }

    //test for multiple user buying, claiming tokens, handle after sale, dev commision
    function testCreatePresaleEther2() public {
        createPresaleEther(0, false);
        vm.warp(2 hours);
        vm.prank(xlazer);
        presale.buyToken{value: 1 ether}(0, 1e18, address(0));

        vm.prank(xlazer2);
        presale.buyToken{value: 2 ether}(0, 2e18, address(0));
        assertEq(xlazer2.balance, 8 ether);

        vm.warp(2 weeks);
        vm.prank(xlazer);
        presale.claimTokens(0);
        assertEq(token.balanceOf(xlazer), 2 * 1e18);

        vm.prank(xlazer2);
        presale.claimTokens(0);
        assertEq(token.balanceOf(xlazer2), 4 * 1e18);

        vm.prank(alice);
        presale.handleAfterSale(0);
        assertEq(alice.balance, 11.85 ether);
        assertEq(token.balanceOf(alice), 0);

        vm.prank(bob);
        presale.collectDevCommission(0);
        assertEq(bob.balance, 11.15 ether);
    }

    //test for affiliate commission & alt fee option
    function testCreatePresaleEther3() public {
        createPresaleEther(5, true);
        vm.warp(2 hours);
        vm.startPrank(xlazer);
        presale.buyToken{value: 1 ether}(0, 1e18, address(0));
        presale.buyToken{value: 2 ether}(0, 2e18, xlazer2);

        vm.warp(2 weeks);
        presale.claimTokens(0);
        assertEq(token.balanceOf(xlazer), 6e18);
        vm.stopPrank();

        vm.prank(alice);
        presale.handleAfterSale(0);
        assertEq(alice.balance, 11.84 ether);

        vm.startPrank(bob);
        presale.collectDevCommission(0);
        assertEq(bob.balance, 11.06 ether);
        assertEq(token.balanceOf(bob), 0.12 * 1e18);
        vm.stopPrank();

        vm.prank(xlazer2);
        presale.collectAffiliateCommission(0);
        assertEq(xlazer2.balance, 10.1 ether);
    }

    //testfail for insufficient creation fee
    function testFailcreatePresaleEther() public {
        createPresaleEther(0, false);
        vm.startPrank(xlazer);
        vm.warp(1 + 1 days);
        presale.buyToken{value: 0.5 ether}(0, 1e18, address(0));
    }

    //using purcahse token
    function createPresalePT(
        uint256 _affiliateRate,
        bool _devFeeInToken
    ) public {
        bool _whitelistedEnabled = true;
        bool _burnOrRefund = true;
        bool _vestingEnabled = true;
        uint256 _softCap = 5 * 10 ** 18;
        uint256 _hardCap = 10 * 10 ** 18;
        uint256 _presaleRate = 1;
        uint256 _minBuy = 1 * 10 ** 18;
        uint256 _maxBuy = 10 * 10 ** 18;
        uint256 _startTime = block.timestamp + 1 hours;
        uint256 _endTime = _startTime + 1 weeks;
        uint256 _firstReleasePercentage = 20;
        uint256 _vestingPeriod = 30;
        uint256 _cycleReleasePercentage = 10;
        uint256 _liquidityAdditionPercent;
        uint256 _liquidityUnlockTime;
        uint256 _listingRate;

        vm.startPrank(alice);
        if (_devFeeInToken) token.mint(alice, 0.2 * 1e18);
        token.approve(address(presale), token.balanceOf(alice));
        presale.createPresale{value: 1 ether}(
            address(token),
            address(purchaseToken),
            _whitelistedEnabled,
            _burnOrRefund,
            _vestingEnabled,
            _devFeeInToken,
            _softCap,
            _hardCap,
            _presaleRate,
            _minBuy,
            _maxBuy,
            _startTime,
            _endTime,
            _affiliateRate,
            _firstReleasePercentage,
            _vestingPeriod,
            _cycleReleasePercentage,
            _liquidityAdditionPercent,
            _liquidityUnlockTime,
            _listingRate
        );

        assertEq(bob.balance, 11 ether);
        assertEq(token.balanceOf(address(alice)), 0);
        vm.stopPrank();
    }

    //test for buying token, whitelisting & refund investment
    function testCreatePresalePT1() public {
        createPresalePT(0, true);
        vm.prank(alice);
        presale.whitelistAddress(0, xlazer);

        vm.startPrank(xlazer);
        vm.warp(2 hours);
        purchaseToken.approve(address(presale), 1 * 1e18);
        presale.buyToken(0, 1e18, address(0));
        assertEq(purchaseToken.balanceOf(xlazer), 9e18);

        vm.warp(2 weeks);
        presale.refundInvestment(0);
        assertEq(purchaseToken.balanceOf(xlazer), 10e18);
        vm.stopPrank();

        vm.prank(alice);
        presale.refundInvestment(0);
        assertEq(token.balanceOf(alice), 10.2e18);
    }

    // test for whitelisting, multiple user buying, claiming tokens (vesting), handle after sale & dev commision
    function testCreatePresalePT2() public {
        createPresalePT(0, false);
        vm.startPrank(alice);
        presale.whitelistAddress(0, xlazer);
        presale.whitelistAddress(0, xlazer2);
        vm.stopPrank();

        vm.warp(2 hours);
        vm.startPrank(xlazer);
        purchaseToken.approve(address(presale), 4 * 1e18);
        presale.buyToken(0, 4e18, address(0));
        purchaseToken.transfer(xlazer2, 5e18);
        vm.stopPrank();

        vm.startPrank(xlazer2);
        purchaseToken.approve(address(presale), 5 * 1e18);
        presale.buyToken(0, 5e18, address(0));
        assertEq(purchaseToken.balanceOf(xlazer2), 0);
        vm.stopPrank();

        vm.warp(2 weeks);
        vm.prank(xlazer);
        presale.claimTokens(0);
        assertEq(token.balanceOf(xlazer), 0.8 * 1e18);

        vm.warp(2 weeks + 30 days);
        vm.prank(xlazer);
        presale.claimTokens(0);
        assertEq(token.balanceOf(xlazer), 1.2 * 1e18);

        vm.warp(2 weeks + 240 days);
        vm.prank(xlazer);
        presale.claimTokens(0);
        assertEq(token.balanceOf(xlazer), 4 * 1e18);

        vm.warp(2 weeks + 240 days);
        vm.prank(xlazer2);
        presale.claimTokens(0);
        assertEq(token.balanceOf(xlazer2), 5 * 1e18);

        vm.prank(alice);
        presale.handleAfterSale(0);
        assertEq(purchaseToken.balanceOf(alice), 8.55 * 1e18);
        assertEq(token.balanceOf(alice), 1 * 1e18);

        vm.prank(bob);
        presale.collectDevCommission(0);
        assertEq(purchaseToken.balanceOf(bob), 0.45 * 1e18);
    }

    //test for affiliate commission & alt fee option
    function testCreatePresalePT3() public {
        createPresalePT(5, true);
        vm.prank(alice);
        presale.whitelistAddress(0, xlazer);

        vm.warp(2 hours);
        vm.startPrank(xlazer);
        purchaseToken.approve(address(presale), 10 * 1e18);
        presale.buyToken(0, 4e18, address(0));
        presale.buyToken(0, 6e18, xlazer2);

        vm.warp(2 weeks + 240 days);
        presale.claimTokens(0);
        assertEq(token.balanceOf(xlazer), 10 * 1e18);
        vm.stopPrank();

        vm.prank(alice);
        presale.handleAfterSale(0);
        assertEq(purchaseToken.balanceOf(alice), 9.5 * 1e18);

        vm.startPrank(bob);
        presale.collectDevCommission(0);
        assertEq(purchaseToken.balanceOf(bob), 0.2 * 1e18);
        assertEq(token.balanceOf(bob), 0.2 * 1e18);
        vm.stopPrank();

        vm.prank(xlazer2);
        presale.collectAffiliateCommission(0);
        assertEq(purchaseToken.balanceOf(xlazer2), 0.3 * 1e18);
    }
}
