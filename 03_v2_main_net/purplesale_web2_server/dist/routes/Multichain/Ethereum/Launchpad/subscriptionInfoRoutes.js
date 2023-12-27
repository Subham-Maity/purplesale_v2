import express from 'express';
import { saveDataEthereum, fetchDataAllEthereum, fetchDataByIdEthereum } from '../../../../controller/Multichain/Ethereum/Launchpads/subscriptionInfoController.js';
const router = express.Router();
router.post('/SubscriptionInfo/Ethereum', saveDataEthereum);
router.get('/Subscription-fetch-data/Ethereum', fetchDataAllEthereum);
router.get('/Subscription-fetch-data/Ethereum/:id', fetchDataByIdEthereum);
export default router;
//# sourceMappingURL=subscriptionInfoRoutes.js.map