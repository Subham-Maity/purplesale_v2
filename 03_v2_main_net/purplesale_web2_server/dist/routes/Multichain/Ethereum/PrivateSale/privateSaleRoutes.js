import express from 'express';
import { saveDataEthereum, fetchDataAllEthereum, fetchDataByIdEthereum } from '../../../../controller/Multichain/Ethereum/PrivateSale/privateSaleController.js';
const router = express.Router();
router.post('/privateSaleInfo/Ethereum', saveDataEthereum);
router.get('/privateSale-fetch-data/Ethereum', fetchDataAllEthereum);
router.get('/privateSale-fetch-data/Ethereum/:id', fetchDataByIdEthereum);
export default router;
//# sourceMappingURL=privateSaleRoutes.js.map