import express from 'express';
import { saveDataAvalanche, fetchDataAllAvalanche, fetchDataByIdAvalanche } from '../../../../../controller/Multichain/Avalanche/Alpha/Launchpads/fairLaunchInfoController.js';

const router = express.Router();

router.post('/Alpha/fairLaunchInfo/Avalanche', saveDataAvalanche);
router.get('/Alpha/fairLaunch-fetch-data/Avalanche', fetchDataAllAvalanche);
router.get('/Alpha/fairLaunch-fetch-data/Avalanche/:id', fetchDataByIdAvalanche);

export default router;
