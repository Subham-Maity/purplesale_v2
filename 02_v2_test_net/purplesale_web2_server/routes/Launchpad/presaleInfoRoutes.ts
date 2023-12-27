import express from 'express';
import { saveData, fetchDataAll, fetchDataById } from '../../controller/Launchpads/presaleInfoController.js';

const router = express.Router();

router.post('/presaleInfo', saveData);
router.get('/presale-fetch-data', fetchDataAll);
router.get('/presale-fetch-data/:id', fetchDataById);

export default router;
