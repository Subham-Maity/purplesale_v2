import express from 'express';
import { saveData, fetchDataAll, fetchDataById } from '../../controller/Launchpads/subscriptionInfoController.js';
const router = express.Router();
router.post('/SubscriptionInfo', saveData);
router.get('/Subscription-fetch-data', fetchDataAll);
router.get('/Subscription-fetch-data/:id', fetchDataById);
export default router;
//# sourceMappingURL=subscriptionInfoRoutes.js.map