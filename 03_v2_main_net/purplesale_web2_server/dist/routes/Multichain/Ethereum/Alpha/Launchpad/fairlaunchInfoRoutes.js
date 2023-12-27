import express from 'express';
import { saveDataEthereum, fetchDataAllEthereum, fetchDataByIdEthereum } from '../../../../../controller/Multichain/Ethereum/Alpha/Launchpads/fairLaunchInfoController.js';
const router = express.Router();
router.post('/Alpha/fairLaunchInfo/Ethereum', saveDataEthereum);
router.get('/Alpha/fairLaunch-fetch-data/Ethereum', fetchDataAllEthereum);
router.get('/Alpha/fairLaunch-fetch-data/Ethereum/:id', fetchDataByIdEthereum);
export default router;
//# sourceMappingURL=fairlaunchInfoRoutes.js.map