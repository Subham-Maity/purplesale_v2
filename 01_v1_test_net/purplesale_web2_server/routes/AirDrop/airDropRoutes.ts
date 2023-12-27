import express from 'express';
import { saveData, fetchDataAll, fetchDataById } from '../../controller/AirDrop/airDropController.js';

const router = express.Router();

router.post('/airDropInfo', saveData);
router.get('/airDrop-fetch-data', fetchDataAll);
router.get('/airDrop-fetch-data/:id', fetchDataById);

export default router;
