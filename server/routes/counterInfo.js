import express from 'express';
const router = express.Router();
import {handleCounter} from '../controllers/counter.js'

router.get("/getCounterInfo", handleCounter);

export default router;