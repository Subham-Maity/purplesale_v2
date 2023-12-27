import express from 'express';
import { saveData, fetchDataAll, fetchDataById } from '../../../controller/Alpha/Launchpads/fairLaunchInfoController.js';

const router = express.Router();

router.post('/Alpha/fairLaunchInfo', saveData);
router.get('/Alpha/fairLaunch-fetch-data', fetchDataAll);
router.get('/Alpha/fairLaunch-fetch-data/:id', fetchDataById);

export default router;
