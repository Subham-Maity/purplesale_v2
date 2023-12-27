import express from 'express';
import { saveDataArbitrum, fetchDataAllArbitrum, fetchDataByIdArbitrum } from '../../../../../controller/Multichain/Arbitrum/Alpha/Launchpads/subscriptionInfoController.js';

const router = express.Router();

router.post('/Alpha/SubscriptionInfo/Arbitrum', saveDataArbitrum);
router.get('/Alpha/Subscription-fetch-data/Arbitrum', fetchDataAllArbitrum);
router.get('/Alpha/Subscription-fetch-data/Arbitrum/:id', fetchDataByIdArbitrum);

export default router;
