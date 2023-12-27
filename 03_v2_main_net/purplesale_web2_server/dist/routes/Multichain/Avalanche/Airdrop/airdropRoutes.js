import express from 'express';
import { saveDataAvalanche, fetchDataAllAvalanche, fetchDataByIdAvalanche } from '../../../../controller/Multichain/Avalanche/AirDrop/airDropController.js';
const router = express.Router();
router.post('/airDropInfo/Avalanche', saveDataAvalanche);
router.get('/airDrop-fetch-data/Avalanche', fetchDataAllAvalanche);
router.get('/airDrop-fetch-data/Avalanche/:id', fetchDataByIdAvalanche);
export default router;
//# sourceMappingURL=airdropRoutes.js.map