import { Router } from 'express';
import { body } from 'express-validator';
import {
    getAllExercises, createExercise, updateExercise, deleteExercise,
    getAllMeals, createMeal, updateMeal, deleteMeal
} from '../controllers/managementController';
import { authenticate, authorize } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

// Protect all routes - only trainer and admin
router.use(authenticate, authorize('trainer', 'admin'));

// Exercises
router.get('/exercises', getAllExercises);
router.post('/exercises', [
    body('name').notEmpty(),
    body('sets').isInt({ min: 1 }),
    body('reps').isInt({ min: 1 }),
    body('instructions').notEmpty(),
    body('category').notEmpty(),
    body('goal').isIn(['weight_loss', 'muscle_gain', 'maintenance']),
    validateRequest
], createExercise);
router.put('/exercises/:id', [
    body('name').notEmpty(),
    body('sets').isInt({ min: 1 }),
    body('reps').isInt({ min: 1 }),
    body('instructions').notEmpty(),
    body('category').notEmpty(),
    body('goal').isIn(['weight_loss', 'muscle_gain', 'maintenance']),
    validateRequest
], updateExercise);
router.delete('/exercises/:id', deleteExercise);

// Meals
router.get('/meals', getAllMeals);
router.post('/meals', [
    body('name').notEmpty(),
    body('type').isIn(['breakfast', 'lunch', 'dinner', 'snack']),
    body('calories').isInt({ min: 0 }),
    body('protein').isInt({ min: 0 }),
    body('carbs').isInt({ min: 0 }),
    body('fat').isInt({ min: 0 }),
    body('ingredients').isArray(),
    body('goal').isIn(['weight_loss', 'muscle_gain', 'maintenance']),
    validateRequest
], createMeal);
router.put('/meals/:id', [
    body('name').notEmpty(),
    body('type').isIn(['breakfast', 'lunch', 'dinner', 'snack']),
    body('calories').isInt({ min: 0 }),
    body('protein').isInt({ min: 0 }),
    body('carbs').isInt({ min: 0 }),
    body('fat').isInt({ min: 0 }),
    body('ingredients').isArray(),
    body('goal').isIn(['weight_loss', 'muscle_gain', 'maintenance']),
    validateRequest
], updateMeal);
router.delete('/meals/:id', deleteMeal);

export default router;
