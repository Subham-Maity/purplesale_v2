import express from 'express';
import { saveDataEthereum, fetchDataAllEthereum, fetchDataByIdEthereum } from '../../../../controller/Multichain/Ethereum/Launchpads/presaleInfoController.js';

const router = express.Router();

router.post('/presaleInfo/Ethereum', saveDataEthereum);
router.get('/presale-fetch-data/Ethereum', fetchDataAllEthereum);
router.get('/presale-fetch-data/Ethereum/:id', fetchDataByIdEthereum);

export default router;
