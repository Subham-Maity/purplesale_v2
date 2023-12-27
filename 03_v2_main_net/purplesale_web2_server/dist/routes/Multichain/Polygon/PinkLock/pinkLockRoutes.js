import express from 'express';
import { fetchPinkLockDataAllPolygon, savePinkLockDataPolygon } from "../../../../controller/Multichain/Polygon/PinkLock/pinkLockController.js";
const router = express.Router();
router.post("/save-data-pinklock/Polygon", savePinkLockDataPolygon);
router.get("/fetch-data-pinklock/Polygon", fetchPinkLockDataAllPolygon);
export default router;
//# sourceMappingURL=pinkLockRoutes.js.map