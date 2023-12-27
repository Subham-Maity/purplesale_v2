import express from 'express';
import { saveDataAvalanche, fetchDataAllAvalanche, fetchDataByIdAvalanche } from '../../../../controller/Multichain/Avalanche/Launchpads/fairLaunchInfoController.js';

const router = express.Router();

router.post('/fairLaunchInfo/Avalanche', saveDataAvalanche);
router.get('/fairLaunch-fetch-data/Avalanche', fetchDataAllAvalanche);
router.get('/fairLaunch-fetch-data/Avalanche/:id', fetchDataByIdAvalanche);

export default router;
