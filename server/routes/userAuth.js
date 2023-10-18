import express from 'express';
import {handleLogin} from '../controllers/userAuth.js'
import {checkAlreadyLoggedIn} from '../middleware.js'
const router = express.Router();

router.post('/login',  handleLogin)
router.get('/check-auth', checkAlreadyLoggedIn)

export default router;