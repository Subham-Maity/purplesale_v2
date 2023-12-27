import express from 'express';
import { fetchPinkLockWeb3Web3DataAllAvalanche, savePinkLockWeb3Web3DataAvalanche } from "../../../../controller/Multichain/Avalanche/PinkLock/pinkLockWe3Controller.js";
const router = express.Router();
router.post("/save-data-pinklock-web3/Avalanche", savePinkLockWeb3Web3DataAvalanche);
router.get("/fetch-data-pinklock-web3/Avalanche", fetchPinkLockWeb3Web3DataAllAvalanche);
export default router;
//# sourceMappingURL=pinkLockWeb3Routes.js.map