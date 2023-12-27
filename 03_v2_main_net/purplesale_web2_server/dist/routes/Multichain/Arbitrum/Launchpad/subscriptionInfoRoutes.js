import express from 'express';
import { saveDataArbitrum, fetchDataAllArbitrum, fetchDataByIdArbitrum } from '../../../../controller/Multichain/Arbitrum/Launchpads/subscriptionInfoController.js';
const router = express.Router();
router.post('/SubscriptionInfo/Arbitrum', saveDataArbitrum);
router.get('/Subscription-fetch-data/Arbitrum', fetchDataAllArbitrum);
router.get('/Subscription-fetch-data/Arbitrum/:id', fetchDataByIdArbitrum);
export default router;
//# sourceMappingURL=subscriptionInfoRoutes.js.map