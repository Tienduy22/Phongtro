import express from 'express';
import * as insertController from '../controllers/insertController.js';
const router = express.Router();

router.post('/db', insertController.insert);

export default router;