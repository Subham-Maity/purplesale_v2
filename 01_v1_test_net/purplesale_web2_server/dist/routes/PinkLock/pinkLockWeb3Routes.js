import express from 'express';
import { fetchPinkLockWeb3Web3DataAll, savePinkLockWeb3Web3Data } from "../../controller/PinkLock/pinkLockWe3Controller.js";
const router = express.Router();
router.post("/save-data-pinklock-web3", savePinkLockWeb3Web3Data);
router.get("/fetch-data-pinklock-web3", fetchPinkLockWeb3Web3DataAll);
export default router;
//# sourceMappingURL=pinkLockWeb3Routes.js.map