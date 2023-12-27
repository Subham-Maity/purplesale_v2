import express from 'express';
import { saveDataPolygon, fetchDataAllPolygon, fetchDataByIdPolygon } from '../../../../../controller/Multichain/Polygon/Alpha/Launchpads/subscriptionInfoController.js';

const router = express.Router();

router.post('/Alpha/SubscriptionInfo/Polygon', saveDataPolygon);
router.get('/Alpha/Subscription-fetch-data/Polygon', fetchDataAllPolygon);
router.get('/Alpha/Subscription-fetch-data/Polygon/:id', fetchDataByIdPolygon);

export default router;
