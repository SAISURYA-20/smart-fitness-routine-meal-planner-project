import { Request, Response, NextFunction } from 'express';
import pool from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Exercises Management
export const getAllExercises = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM exercises ORDER BY goal, category');
        res.json({ exercises: rows });
    } catch (error) {
        next(error);
    }
};

export const createExercise = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, sets, reps, duration, instructions, category, goal } = req.body;
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO exercises (name, sets, reps, duration, instructions, category, goal) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, sets, reps, duration || null, instructions, category, goal]
        );
        res.status(201).json({ message: 'Exercise created successfully', id: result.insertId });
    } catch (error) {
        next(error);
    }
};

export const updateExercise = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, sets, reps, duration, instructions, category, goal } = req.body;
        await pool.query(
            'UPDATE exercises SET name = ?, sets = ?, reps = ?, duration = ?, instructions = ?, category = ?, goal = ? WHERE id = ?',
            [name, sets, reps, duration || null, instructions, category, goal, id]
        );
        res.json({ message: 'Exercise updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteExercise = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM exercises WHERE id = ?', [id]);
        res.json({ message: 'Exercise deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Meals Management
export const getAllMeals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM meals ORDER BY goal, type');
        res.json({ meals: rows });
    } catch (error) {
        next(error);
    }
};

export const createMeal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, type, calories, protein, carbs, fat, ingredients, goal } = req.body;
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients, goal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, type, calories, protein, carbs, fat, JSON.stringify(ingredients), goal]
        );
        res.status(201).json({ message: 'Meal created successfully', id: result.insertId });
    } catch (error) {
        next(error);
    }
};

export const updateMeal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, type, calories, protein, carbs, fat, ingredients, goal } = req.body;
        await pool.query(
            'UPDATE meals SET name = ?, type = ?, calories = ?, protein = ?, carbs = ?, fat = ?, ingredients = ?, goal = ? WHERE id = ?',
            [name, type, calories, protein, carbs, fat, JSON.stringify(ingredients), goal, id]
        );
        res.json({ message: 'Meal updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteMeal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM meals WHERE id = ?', [id]);
        res.json({ message: 'Meal deleted successfully' });
    } catch (error) {
        next(error);
    }
};
