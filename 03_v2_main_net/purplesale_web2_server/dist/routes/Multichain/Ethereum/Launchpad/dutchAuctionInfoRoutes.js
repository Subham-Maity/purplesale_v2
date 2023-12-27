import express from 'express';
import { saveDataEthereum, fetchDataAllEthereum, fetchDataByIdEthereum } from '../../../../controller/Multichain/Ethereum/Launchpads/dutchAuctionController.js';
const router = express.Router();
router.post('/dutchAuctionInfo/Ethereum', saveDataEthereum);
router.get('/dutchAuction-fetch-data/Ethereum', fetchDataAllEthereum);
router.get('/dutchAuction-fetch-data/Ethereum/:id', fetchDataByIdEthereum);
export default router;
//# sourceMappingURL=dutchAuctionInfoRoutes.js.map