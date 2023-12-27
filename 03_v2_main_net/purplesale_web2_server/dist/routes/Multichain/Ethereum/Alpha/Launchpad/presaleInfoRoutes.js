import express from 'express';
import { saveDataEthereum, fetchDataAllEthereum, fetchDataByIdEthereum } from '../../../../../controller/Multichain/Ethereum/Alpha/Launchpads/presaleInfoController.js';
const router = express.Router();
router.post('/Alpha/presaleInfoEthereum/Ethereum', saveDataEthereum);
router.get('/Alpha/presale-fetch-dataEthereum/Ethereum', fetchDataAllEthereum);
router.get('/Alpha/presale-fetch-dataEthereum/Ethereum/:id', fetchDataByIdEthereum);
export default router;
//# sourceMappingURL=presaleInfoRoutes.js.map