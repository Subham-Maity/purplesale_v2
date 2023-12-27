import express from 'express';
import { saveDataEthereum, fetchDataAllEthereum, fetchDataByIdEthereum } from '../../../../../controller/Multichain/Ethereum/Alpha/Launchpads/subscriptionInfoController.js';

const router = express.Router();

router.post('/Alpha/SubscriptionInfo/Ethereum', saveDataEthereum);
router.get('/Alpha/Subscription-fetch-data/Ethereum', fetchDataAllEthereum);
router.get('/Alpha/Subscription-fetch-data/Ethereum/:id', fetchDataByIdEthereum);

export default router;
