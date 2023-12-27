import express from 'express';
import { saveDataArbitrum, fetchDataAllArbitrum, fetchDataByIdArbitrum } from '../../../../controller/Multichain/Arbitrum/AirDrop/airDropController.js';
const router = express.Router();
router.post('/airDropInfo/Arbitrum', saveDataArbitrum);
router.get('/airDrop-fetch-data/Arbitrum', fetchDataAllArbitrum);
router.get('/airDrop-fetch-data/Arbitrum/:id', fetchDataByIdArbitrum);
export default router;
//# sourceMappingURL=airdropRoutes.js.map