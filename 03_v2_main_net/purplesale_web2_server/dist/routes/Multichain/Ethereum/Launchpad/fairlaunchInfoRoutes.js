import express from 'express';
import { saveDataEthereum, fetchDataAllEthereum, fetchDataByIdEthereum } from '../../../../controller/Multichain/Ethereum/Launchpads/fairLaunchInfoController.js';
const router = express.Router();
router.post('/fairLaunchInfo/Ethereum', saveDataEthereum);
router.get('/fairLaunch-fetch-data/Ethereum', fetchDataAllEthereum);
router.get('/fairLaunch-fetch-data/Ethereum/:id', fetchDataByIdEthereum);
export default router;
//# sourceMappingURL=fairlaunchInfoRoutes.js.map