import { Router } from 'express';
import { getUserProfile } from './user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/profile').get(protect,getUserProfile);

export default router;
