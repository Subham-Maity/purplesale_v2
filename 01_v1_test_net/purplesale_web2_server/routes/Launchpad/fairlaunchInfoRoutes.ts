import express from 'express';
import { saveData, fetchDataAll, fetchDataById } from '../../controller/Launchpads/fairLaunchInfoController.js';

const router = express.Router();

router.post('/fairLaunchInfo', saveData);
router.get('/fairLaunch-fetch-data', fetchDataAll);
router.get('/fairLaunch-fetch-data/:id', fetchDataById);

export default router;
