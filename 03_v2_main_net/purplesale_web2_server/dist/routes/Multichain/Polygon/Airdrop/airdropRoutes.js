import express from 'express';
import { saveDataPolygon, fetchDataAllPolygon, fetchDataByIdPolygon } from '../../../../controller/Multichain/Polygon/AirDrop/airDropController.js';
const router = express.Router();
router.post('/airDropInfo/Polygon', saveDataPolygon);
router.get('/airDrop-fetch-data/Polygon', fetchDataAllPolygon);
router.get('/airDrop-fetch-data/Polygon/:id', fetchDataByIdPolygon);
export default router;
//# sourceMappingURL=airdropRoutes.js.map