import express from 'express';
import { saveDataArbitrum, fetchDataAllArbitrum, fetchDataByIdArbitrum } from '../../../../controller/Multichain/Arbitrum/Launchpads/presaleInfoController.js';

const router = express.Router();

router.post('/presaleInfo/Arbitrum', saveDataArbitrum);
router.get('/presale-fetch-data/Arbitrum', fetchDataAllArbitrum);
router.get('/presale-fetch-data/Arbitrum/:id', fetchDataByIdArbitrum);

export default router;
