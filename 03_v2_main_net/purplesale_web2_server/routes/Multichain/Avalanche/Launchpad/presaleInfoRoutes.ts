import express from 'express';
import { saveDataAvalanche, fetchDataAllAvalanche, fetchDataByIdAvalanche } from '../../../../controller/Multichain/Avalanche/Launchpads/presaleInfoController.js';

const router = express.Router();

router.post('/presaleInfo/Avalanche', saveDataAvalanche);
router.get('/presale-fetch-data/Avalanche', fetchDataAllAvalanche);
router.get('/presale-fetch-data/Avalanche/:id', fetchDataByIdAvalanche);

export default router;
