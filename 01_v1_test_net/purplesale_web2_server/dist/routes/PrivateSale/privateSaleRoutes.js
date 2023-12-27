import express from 'express';
import { saveData, fetchDataAll, fetchDataById } from '../../controller/PrivateSale/privateSaleController.js';
const router = express.Router();
router.post('/privateSaleInfo', saveData);
router.get('/privateSale-fetch-data', fetchDataAll);
router.get('/privateSale-fetch-data/:id', fetchDataById);
export default router;
//# sourceMappingURL=privateSaleRoutes.js.map