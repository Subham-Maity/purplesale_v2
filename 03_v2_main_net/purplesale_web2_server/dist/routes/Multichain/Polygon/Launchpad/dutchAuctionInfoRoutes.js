import express from 'express';
import { saveDataPolygon, fetchDataAllPolygon, fetchDataByIdPolygon } from '../../../../controller/Multichain/Polygon/Launchpads/dutchAuctionController.js';
const router = express.Router();
router.post('/dutchAuctionInfo/Polygon', saveDataPolygon);
router.get('/dutchAuction-fetch-data/Polygon', fetchDataAllPolygon);
router.get('/dutchAuction-fetch-data/Polygon/:id', fetchDataByIdPolygon);
export default router;
//# sourceMappingURL=dutchAuctionInfoRoutes.js.map