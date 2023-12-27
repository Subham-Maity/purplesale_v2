import express from 'express';
import { addToCart, getCartItems, getCartItemsByWallet, deleteCartItem } from '../../controller/Cards/cardController.js';

const router = express.Router();

router.post('/cart', addToCart);

// Fetch all items in the cart
router.get('/getCart', getCartItems);

router.get('/getCart/:walletAddress', getCartItemsByWallet);

router.delete('/deleteCart/:itemId', deleteCartItem);

export default router;
