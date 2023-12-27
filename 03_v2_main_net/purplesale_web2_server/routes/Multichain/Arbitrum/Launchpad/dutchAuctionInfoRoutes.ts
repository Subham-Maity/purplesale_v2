import express from 'express';
import { saveDataArbitrum, fetchDataAllArbitrum, fetchDataByIdArbitrum } from '../../../../controller/Multichain/Arbitrum/Launchpads/dutchAuctionController.js';

const router = express.Router();

router.post('/dutchAuctionInfo/Arbitrum', saveDataArbitrum);
router.get('/dutchAuction-fetch-data/Arbitrum', fetchDataAllArbitrum);
router.get('/dutchAuction-fetch-data/Arbitrum/:id', fetchDataByIdArbitrum);

export default router;
