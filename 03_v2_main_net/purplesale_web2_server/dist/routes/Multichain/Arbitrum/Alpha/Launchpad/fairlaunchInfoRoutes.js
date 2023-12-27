import express from 'express';
import { saveDataArbitrum, fetchDataAllArbitrum, fetchDataByIdArbitrum } from '../../../../../controller/Multichain/Arbitrum/Alpha/Launchpads/fairLaunchInfoController.js';
const router = express.Router();
router.post('/Alpha/fairLaunchInfo/Arbitrum', saveDataArbitrum);
router.get('/Alpha/fairLaunch-fetch-data/Arbitrum', fetchDataAllArbitrum);
router.get('/Alpha/fairLaunch-fetch-data/Arbitrum/:id', fetchDataByIdArbitrum);
export default router;
//# sourceMappingURL=fairlaunchInfoRoutes.js.map