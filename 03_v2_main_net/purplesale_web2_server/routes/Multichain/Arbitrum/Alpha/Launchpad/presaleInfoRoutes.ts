import express from 'express';
import { saveDataArbitrum, fetchDataAllArbitrum, fetchDataByIdArbitrum } from '../../../../../controller/Multichain/Arbitrum/Alpha/Launchpads/presaleInfoController.js';

const router = express.Router();

router.post('/Alpha/presaleInfo/Arbitrum', saveDataArbitrum);
router.get('/Alpha/presale-fetch-data/Arbitrum', fetchDataAllArbitrum);
router.get('/Alpha/presale-fetch-data/Arbitrum/:id', fetchDataByIdArbitrum);

export default router;
