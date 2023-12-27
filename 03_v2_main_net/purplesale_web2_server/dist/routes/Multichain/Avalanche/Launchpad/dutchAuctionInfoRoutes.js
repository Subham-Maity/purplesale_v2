import express from 'express';
import { saveDataAvalanche, fetchDataAllAvalanche, fetchDataByIdAvalanche } from '../../../../controller/Multichain/Avalanche/Launchpads/dutchAuctionController.js';
const router = express.Router();
router.post('/dutchAuctionInfo/Avalanche', saveDataAvalanche);
router.get('/dutchAuction-fetch-data/Avalanche', fetchDataAllAvalanche);
router.get('/dutchAuction-fetch-data/Avalanche/:id', fetchDataByIdAvalanche);
export default router;
//# sourceMappingURL=dutchAuctionInfoRoutes.js.map