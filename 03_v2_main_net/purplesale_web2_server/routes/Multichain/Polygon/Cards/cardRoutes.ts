import express from 'express';
import { addToCartPolygon, getCartItemsPolygon, getCartItemsByWalletPolygon, deleteCartItemPolygon } from '../../../../controller/Multichain/Polygon/Cards/cardController.js';

const router = express.Router();

router.post('/cart/Polygon', addToCartPolygon);

// Fetch all items in the cart
router.get('/getCart/Polygon', getCartItemsPolygon);

router.get('/getCart/Polygon/:walletAddress', getCartItemsByWalletPolygon);

router.delete('/deleteCart/Polygon/:itemId', deleteCartItemPolygon);

export default router;
