import Cart from '../../../../model/Multichain/Arbitrum/Cards/cardModel.js';
import catchAsyncError from '../../../../middleware/catchAsyncError.js';
import ErrorHandler from '../../../../utils/errorHandler.js';
export const addToCartArbitrum = catchAsyncError(async (req, res, next) => {
    try {
        const { Name, Symbol, Link, WalletAddress, imgHref, bgLogoUrl, } = req.body;
        const newCartItem = new Cart({
            Name,
            Symbol,
            Link,
            WalletAddress,
            imgHref,
            bgLogoUrl,
        });
        await newCartItem.save();
        res.status(201).json({ message: "Item added to cart successfully" });
    }
    catch (error) {
        console.error("Error adding to cart:", error);
        next(new ErrorHandler("Internal server error", 500));
    }
});
export const getCartItemsArbitrum = catchAsyncError(async (req, res, next) => {
    try {
        const cartItems = await Cart.find();
        res.status(200).json(cartItems);
    }
    catch (error) {
        console.error("Error fetching cart items:", error);
        next(new ErrorHandler("Internal server error", 500));
    }
});
export const getCartItemsByWalletArbitrum = catchAsyncError(async (req, res, next) => {
    try {
        const { walletAddress } = req.params;
        const cartItems = await Cart.find({ WalletAddress: walletAddress });
        res.status(200).json(cartItems);
    }
    catch (error) {
        console.error("Error fetching cart items by wallet:", error);
        next(new ErrorHandler("Internal server error", 500)); // Pass the error to the error handling middleware
    }
});
export const deleteCartItemArbitrum = catchAsyncError(async (req, res, next) => {
    try {
        const { itemId } = req.params;
        console.log("Received itemId:", itemId); // Add this line for debugging
        const deletedCartItem = await Cart.findByIdAndRemove(itemId);
        if (!deletedCartItem) {
            return next(new ErrorHandler("Item not found in the cart", 404));
        }
        res.status(200).json({ message: "Item removed from cart successfully" });
    }
    catch (error) {
        console.error("Error deleting item from cart:", error);
        next(new ErrorHandler("Internal server error", 500));
    }
});
//# sourceMappingURL=cardController.js.map