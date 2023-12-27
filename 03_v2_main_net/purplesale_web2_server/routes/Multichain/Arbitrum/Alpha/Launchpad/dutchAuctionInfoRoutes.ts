import express from 'express';
import { saveDataArbitrum, fetchDataAllArbitrum, fetchDataByIdArbitrum } from '../../../../../controller/Multichain/Arbitrum/Alpha/Launchpads/dutchAuctionController.js';

const router = express.Router();

router.post('/Alpha/dutchAuctionInfo/Arbitrum', saveDataArbitrum);
router.get('/Alpha/dutchAuction-fetch-data/Arbitrum', fetchDataAllArbitrum);
router.get('/Alpha/dutchAuction-fetch-data/Arbitrum/:id', fetchDataByIdArbitrum);

export default router;
