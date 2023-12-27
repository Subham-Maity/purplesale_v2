import express from 'express';
import {fetchPinkLockDataAll, savePinkLockData} from "../../controller/PinkLock/pinkLockController.js";

const router = express.Router();

router.post("/save-data-pinklock", savePinkLockData);
router.get("/fetch-data-pinklock", fetchPinkLockDataAll);


export default router;
