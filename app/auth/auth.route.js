import { Router } from 'express';
import { authUser, registerUser } from './auth.controller.js';

const router = Router();

router.route('/login').post(authUser);
router.route('/register').post(registerUser);

export default router;
