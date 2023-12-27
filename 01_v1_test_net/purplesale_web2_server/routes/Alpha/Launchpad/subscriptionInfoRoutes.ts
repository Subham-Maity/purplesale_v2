import express from 'express';
import { saveData, fetchDataAll, fetchDataById } from '../../../controller/Alpha/Launchpads/subscriptionInfoController.js';

const router = express.Router();

router.post('/Alpha/SubscriptionInfo', saveData);
router.get('/Alpha/Subscription-fetch-data', fetchDataAll);
router.get('/Alpha/Subscription-fetch-data/:id', fetchDataById);

export default router;
