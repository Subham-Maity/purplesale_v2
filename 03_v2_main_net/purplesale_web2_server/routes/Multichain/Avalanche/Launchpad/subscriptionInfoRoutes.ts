import express from 'express';
import { saveDataAvalanche, fetchDataAllAvalanche, fetchDataByIdAvalanche } from '../../../../controller/Multichain/Avalanche/Launchpads/subscriptionInfoController.js';

const router = express.Router();

router.post('/SubscriptionInfo/Avalanche', saveDataAvalanche);
router.get('/Subscription-fetch-data/Avalanche', fetchDataAllAvalanche);
router.get('/Subscription-fetch-data/Avalanche/:id', fetchDataByIdAvalanche);

export default router;
