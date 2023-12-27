import express from 'express';
import { saveDataPolygon, fetchDataAllPolygon, fetchDataByIdPolygon } from '../../../../controller/Multichain/Polygon/Launchpads/fairLaunchInfoController.js';

const router = express.Router();

router.post('/fairLaunchInfo/Polygon', saveDataPolygon);
router.get('/fairLaunch-fetch-data/Polygon', fetchDataAllPolygon);
router.get('/fairLaunch-fetch-data/Polygon/:id', fetchDataByIdPolygon);

export default router;
