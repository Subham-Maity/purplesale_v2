import express from 'express';
import { saveDataAvalanche, fetchDataAllAvalanche, fetchDataByIdAvalanche } from '../../../../../controller/Multichain/Avalanche/Alpha/Launchpads/dutchAuctionController.js';
const router = express.Router();
router.post('/Alpha/dutchAuctionInfo/Avalanche', saveDataAvalanche);
router.get('/Alpha/dutchAuction-fetch-data/Avalanche', fetchDataAllAvalanche);
router.get('/Alpha/dutchAuction-fetch-data/Avalanche/:id', fetchDataByIdAvalanche);
export default router;
//# sourceMappingURL=dutchAuctionInfoRoutes.js.map