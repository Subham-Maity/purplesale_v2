import express from 'express';
import { saveDataPolygon, fetchDataAllPolygon, fetchDataByIdPolygon } from '../../../../controller/Multichain/Polygon/PrivateSale/privateSaleController.js';

const router = express.Router();

router.post('/privateSaleInfo/Polygon', saveDataPolygon);
router.get('/privateSale-fetch-data/Polygon', fetchDataAllPolygon);
router.get('/privateSale-fetch-data/Polygon/:id', fetchDataByIdPolygon);

export default router;
