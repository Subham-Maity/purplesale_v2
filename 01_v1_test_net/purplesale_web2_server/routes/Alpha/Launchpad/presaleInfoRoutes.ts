import express from 'express';
import { saveData, fetchDataAll, fetchDataById } from '../../../controller/Alpha/Launchpads/presaleInfoController.js';

const router = express.Router();

router.post('/Alpha/presaleInfo', saveData);
router.get('/Alpha/presale-fetch-data', fetchDataAll);
router.get('/Alpha/presale-fetch-data/:id', fetchDataById);

export default router;
