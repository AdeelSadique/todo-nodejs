import express from 'express';
import cors from 'cors';
import { userLogin, userLogout, userRegisteration } from '../controllers/user.js';
import { erroMiddleware } from '../utils/errorHanlder.js';

const router = express.Router();
router.use(express.json());
router.use(cors({ origin: 'http://localhost:5173', credentials: true }));

router.post('/register', userRegisteration, erroMiddleware);
router.post('/login', userLogin);
router.get('/logout', userLogout);

export default router;
