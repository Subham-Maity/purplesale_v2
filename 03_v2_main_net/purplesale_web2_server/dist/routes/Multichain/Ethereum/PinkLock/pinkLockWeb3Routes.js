import express from 'express';
import { fetchPinkLockWeb3Web3DataAllEthereum, savePinkLockWeb3Web3DataEthereum } from "../../../../controller/Multichain/Ethereum/PinkLock/pinkLockWe3Controller.js";
const router = express.Router();
router.post("/save-data-pinklock-web3/Ethereum", savePinkLockWeb3Web3DataEthereum);
router.get("/fetch-data-pinklock-web3/Ethereum", fetchPinkLockWeb3Web3DataAllEthereum);
export default router;
//# sourceMappingURL=pinkLockWeb3Routes.js.map