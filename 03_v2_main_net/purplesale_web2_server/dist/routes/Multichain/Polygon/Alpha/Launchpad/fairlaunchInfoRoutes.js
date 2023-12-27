import express from 'express';
import { saveDataPolygon, fetchDataAllPolygon, fetchDataByIdPolygon } from '../../../../../controller/Multichain/Polygon/Alpha/Launchpads/fairLaunchInfoController.js';
const router = express.Router();
router.post('/Alpha/fairLaunchInfo/Polygon', saveDataPolygon);
router.get('/Alpha/fairLaunch-fetch-data/Polygon', fetchDataAllPolygon);
router.get('/Alpha/fairLaunch-fetch-data/Polygon/:id', fetchDataByIdPolygon);
export default router;
//# sourceMappingURL=fairlaunchInfoRoutes.js.map