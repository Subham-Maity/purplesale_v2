import express from 'express';
import { addToCartArbitrum, getCartItemsArbitrum, getCartItemsByWalletArbitrum, deleteCartItemArbitrum } from '../../../../controller/Multichain/Arbitrum/Cards/cardController.js';

const router = express.Router();

router.post('/cart/Arbitrum', addToCartArbitrum);

// Fetch all items in the cart
router.get('/getCart/Arbitrum', getCartItemsArbitrum);

router.get('/getCart/Arbitrum/:walletAddress', getCartItemsByWalletArbitrum);

router.delete('/deleteCart/Arbitrum/:itemId', deleteCartItemArbitrum);

export default router;
