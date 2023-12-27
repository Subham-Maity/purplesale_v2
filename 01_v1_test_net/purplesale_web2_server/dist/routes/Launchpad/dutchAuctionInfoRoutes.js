import express from 'express';
import { saveData, fetchDataAll, fetchDataById } from '../../controller/Launchpads/dutchAuctionController.js';
const router = express.Router();
router.post('/dutchAuctionInfo', saveData);
router.get('/dutchAuction-fetch-data', fetchDataAll);
router.get('/dutchAuction-fetch-data/:id', fetchDataById);
export default router;
//# sourceMappingURL=dutchAuctionInfoRoutes.js.map