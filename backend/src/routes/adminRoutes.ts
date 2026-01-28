import { Router } from 'express';
import { getSystemStats, getAllUsers, updateUserRole } from '../controllers/adminController';
import { authenticate, authorize } from '../middleware/auth';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

// Protect all routes - only admin
router.use(authenticate, authorize('admin'));

router.get('/stats', getSystemStats);
router.get('/users', getAllUsers);
router.put('/users/:id/role', [
    body('role').isIn(['user', 'trainer', 'admin']),
    validateRequest
], updateUserRole);

export default router;
