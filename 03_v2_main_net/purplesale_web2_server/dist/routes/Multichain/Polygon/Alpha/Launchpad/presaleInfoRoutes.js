import express from 'express';
import { saveDataPolygon, fetchDataAllPolygon, fetchDataByIdPolygon } from '../../../../../controller/Multichain/Polygon/Alpha/Launchpads/presaleInfoController.js';
const router = express.Router();
router.post('/Alpha/presaleInfoPolygon/Polygon', saveDataPolygon);
router.get('/Alpha/presale-fetch-dataPolygon/Polygon', fetchDataAllPolygon);
router.get('/Alpha/presale-fetch-dataPolygon/Polygon/:id', fetchDataByIdPolygon);
export default router;
//# sourceMappingURL=presaleInfoRoutes.js.map