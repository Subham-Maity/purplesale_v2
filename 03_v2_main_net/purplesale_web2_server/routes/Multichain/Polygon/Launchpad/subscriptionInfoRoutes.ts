import express from 'express';
import { saveDataPolygon, fetchDataAllPolygon, fetchDataByIdPolygon } from '../../../../controller/Multichain/Polygon/Launchpads/subscriptionInfoController.js';

const router = express.Router();

router.post('/SubscriptionInfo/Polygon', saveDataPolygon);
router.get('/Subscription-fetch-data/Polygon', fetchDataAllPolygon);
router.get('/Subscription-fetch-data/Polygon/:id', fetchDataByIdPolygon);

export default router;
