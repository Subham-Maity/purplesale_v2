import express from 'express';
import { addToCartEthereum, getCartItemsEthereum, getCartItemsByWalletEthereum, deleteCartItemEthereum } from '../../../../controller/Multichain/Ethereum/Cards/cardController.js';

const router = express.Router();

router.post('/cart/Ethereum', addToCartEthereum);

// Fetch all items in the cart
router.get('/getCart/Ethereum', getCartItemsEthereum);

router.get('/getCart/Ethereum/:walletAddress', getCartItemsByWalletEthereum);

router.delete('/deleteCart/Ethereum/:itemId', deleteCartItemEthereum);

export default router;
