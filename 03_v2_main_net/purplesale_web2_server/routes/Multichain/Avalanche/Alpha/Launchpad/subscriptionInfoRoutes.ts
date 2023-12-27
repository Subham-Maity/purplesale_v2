import express from 'express';
import { saveDataAvalanche, fetchDataAllAvalanche, fetchDataByIdAvalanche } from '../../../../../controller/Multichain/Avalanche/Alpha/Launchpads/subscriptionInfoController.js';

const router = express.Router();

router.post('/Alpha/SubscriptionInfo/Avalanche', saveDataAvalanche);
router.get('/Alpha/Subscription-fetch-data/Avalanche', fetchDataAllAvalanche);
router.get('/Alpha/Subscription-fetch-data/Avalanche/:id', fetchDataByIdAvalanche);

export default router;
