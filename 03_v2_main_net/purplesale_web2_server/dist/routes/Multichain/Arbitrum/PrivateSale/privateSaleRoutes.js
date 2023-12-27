import express from 'express';
import { saveDataArbitrum, fetchDataAllArbitrum, fetchDataByIdArbitrum } from '../../../../controller/Multichain/Arbitrum/PrivateSale/privateSaleController.js';
const router = express.Router();
router.post('/privateSaleInfo/Arbitrum', saveDataArbitrum);
router.get('/privateSale-fetch-data/Arbitrum', fetchDataAllArbitrum);
router.get('/privateSale-fetch-data/Arbitrum/:id', fetchDataByIdArbitrum);
export default router;
//# sourceMappingURL=privateSaleRoutes.js.map