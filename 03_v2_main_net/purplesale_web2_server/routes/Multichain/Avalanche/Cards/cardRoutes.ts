import express from 'express';
import { addToCartAvalanche, getCartItemsAvalanche, getCartItemsByWalletAvalanche, deleteCartItemAvalanche } from '../../../../controller/Multichain/Avalanche/Cards/cardController.js';

const router = express.Router();

router.post('/cart/Avalanche', addToCartAvalanche);

// Fetch all items in the cart
router.get('/getCart/Avalanche', getCartItemsAvalanche);

router.get('/getCart/Avalanche/:walletAddress', getCartItemsByWalletAvalanche);

router.delete('/deleteCart/Avalanche/:itemId', deleteCartItemAvalanche);

export default router;
