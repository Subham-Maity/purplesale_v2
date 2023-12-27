import express from 'express';
import { fetchPinkLockDataAllAvalanche, savePinkLockDataAvalanche } from "../../../../controller/Multichain/Avalanche/PinkLock/pinkLockController.js";
const router = express.Router();
router.post("/save-data-pinklock/Avalanche", savePinkLockDataAvalanche);
router.get("/fetch-data-pinklock/Avalanche", fetchPinkLockDataAllAvalanche);
export default router;
//# sourceMappingURL=pinkLockRoutes.js.map