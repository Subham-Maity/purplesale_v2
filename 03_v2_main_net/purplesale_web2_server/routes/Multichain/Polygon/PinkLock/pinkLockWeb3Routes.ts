import express from 'express';
import {fetchPinkLockWeb3Web3DataAllPolygon, savePinkLockWeb3Web3DataPolygon} from "../../../../controller/Multichain/Polygon/PinkLock/pinkLockWe3Controller.js";

const router = express.Router();

router.post("/save-data-pinklock-web3/Polygon", savePinkLockWeb3Web3DataPolygon);
router.get("/fetch-data-pinklock-web3/Polygon", fetchPinkLockWeb3Web3DataAllPolygon);


export default router;
