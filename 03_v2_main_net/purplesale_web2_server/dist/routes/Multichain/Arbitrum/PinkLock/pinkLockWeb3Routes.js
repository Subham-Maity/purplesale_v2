import express from 'express';
import { fetchPinkLockWeb3Web3DataAllArbitrum, savePinkLockWeb3Web3DataArbitrum } from "../../../../controller/Multichain/Arbitrum/PinkLock/pinkLockWe3Controller.js";
const router = express.Router();
router.post("/save-data-pinklock-web3/Arbitrum", savePinkLockWeb3Web3DataArbitrum);
router.get("/fetch-data-pinklock-web3/Arbitrum", fetchPinkLockWeb3Web3DataAllArbitrum);
export default router;
//# sourceMappingURL=pinkLockWeb3Routes.js.map