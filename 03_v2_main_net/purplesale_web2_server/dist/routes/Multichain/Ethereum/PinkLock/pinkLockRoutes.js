import express from 'express';
import { fetchPinkLockDataAllEthereum, savePinkLockDataEthereum } from "../../../../controller/Multichain/Ethereum/PinkLock/pinkLockController.js";
const router = express.Router();
router.post("/save-data-pinklock/Ethereum", savePinkLockDataEthereum);
router.get("/fetch-data-pinklock/Ethereum", fetchPinkLockDataAllEthereum);
export default router;
//# sourceMappingURL=pinkLockRoutes.js.map