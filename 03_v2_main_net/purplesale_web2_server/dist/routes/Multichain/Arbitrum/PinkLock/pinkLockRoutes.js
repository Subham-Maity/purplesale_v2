import express from 'express';
import { fetchPinkLockDataAllArbitrum, savePinkLockDataArbitrum } from "../../../../controller/Multichain/Arbitrum/PinkLock/pinkLockController.js";
const router = express.Router();
router.post("/save-data-pinklock/Arbitrum", savePinkLockDataArbitrum);
router.get("/fetch-data-pinklock/Arbitrum", fetchPinkLockDataAllArbitrum);
export default router;
//# sourceMappingURL=pinkLockRoutes.js.map