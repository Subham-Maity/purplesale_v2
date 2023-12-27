import express from 'express';
import { saveDataPolygon, fetchDataAllPolygon, fetchDataByIdPolygon } from '../../../../controller/Multichain/Polygon/Launchpads/presaleInfoController.js';
const router = express.Router();
router.post('/presaleInfo/Polygon', saveDataPolygon);
router.get('/presale-fetch-data/Polygon', fetchDataAllPolygon);
router.get('/presale-fetch-data/Polygon/:id', fetchDataByIdPolygon);
export default router;
//# sourceMappingURL=presaleInfoRoutes.js.map