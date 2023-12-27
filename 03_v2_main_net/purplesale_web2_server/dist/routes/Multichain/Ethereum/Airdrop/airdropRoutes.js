import express from 'express';
import { saveDataEthereum, fetchDataAllEthereum, fetchDataByIdEthereum } from '../../../../controller/Multichain/Ethereum/AirDrop/airDropController.js';
const router = express.Router();
router.post('/airDropInfo/Ethereum', saveDataEthereum);
router.get('/airDrop-fetch-data/Ethereum', fetchDataAllEthereum);
router.get('/airDrop-fetch-data/Ethereum/:id', fetchDataByIdEthereum);
export default router;
//# sourceMappingURL=airdropRoutes.js.map