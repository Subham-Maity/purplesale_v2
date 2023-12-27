import express from 'express';
import { saveData, fetchDataAll, fetchDataById } from '../../../controller/Alpha/Launchpads/dutchAuctionController.js';

const router = express.Router();

router.post('/Alpha/dutchAuctionInfo', saveData);
router.get('/Alpha/dutchAuction-fetch-data', fetchDataAll);
router.get('/Alpha/dutchAuction-fetch-data/:id', fetchDataById);

export default router;
