import express from 'express';
import { saveDataAvalanche, fetchDataAllAvalanche, fetchDataByIdAvalanche } from '../../../../controller/Multichain/Avalanche/PrivateSale/privateSaleController.js';

const router = express.Router();

router.post('/privateSaleInfo/Avalanche', saveDataAvalanche);
router.get('/privateSale-fetch-data/Avalanche', fetchDataAllAvalanche);
router.get('/privateSale-fetch-data/Avalanche/:id', fetchDataByIdAvalanche);

export default router;
