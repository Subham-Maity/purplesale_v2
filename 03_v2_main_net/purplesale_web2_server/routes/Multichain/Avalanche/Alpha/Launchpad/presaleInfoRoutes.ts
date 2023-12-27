import express from 'express';
import { saveDataAvalanche, fetchDataAllAvalanche, fetchDataByIdAvalanche } from '../../../../../controller/Multichain/Avalanche/Alpha/Launchpads/presaleInfoController.js';

const router = express.Router();

router.post('/Alpha/presaleInfoAvalanche/Avalanche', saveDataAvalanche);
router.get('/Alpha/presale-fetch-dataAvalanche/Avalanche', fetchDataAllAvalanche);
router.get('/Alpha/presale-fetch-dataAvalanche/Avalanche/:id', fetchDataByIdAvalanche);

export default router;
