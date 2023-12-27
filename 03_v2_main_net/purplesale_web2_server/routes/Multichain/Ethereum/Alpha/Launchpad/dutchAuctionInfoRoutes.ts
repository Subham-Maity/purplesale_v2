import express from 'express';
import { saveDataEthereum, fetchDataAllEthereum, fetchDataByIdEthereum } from '../../../../../controller/Multichain/Ethereum/Alpha/Launchpads/dutchAuctionController.js';

const router = express.Router();

router.post('/Alpha/dutchAuctionInfo/Ethereum', saveDataEthereum);
router.get('/Alpha/dutchAuction-fetch-data/Ethereum', fetchDataAllEthereum);
router.get('/Alpha/dutchAuction-fetch-data/Ethereum/:id', fetchDataByIdEthereum);

export default router;
