import express from 'express';
import { saveDataPolygon, fetchDataAllPolygon, fetchDataByIdPolygon } from '../../../../../controller/Multichain/Polygon/Alpha/Launchpads/dutchAuctionController.js';

const router = express.Router();

router.post('/Alpha/dutchAuctionInfo/Polygon', saveDataPolygon);
router.get('/Alpha/dutchAuction-fetch-data/Polygon', fetchDataAllPolygon);
router.get('/Alpha/dutchAuction-fetch-data/Polygon/:id', fetchDataByIdPolygon);

export default router;
