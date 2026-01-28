import { Request, Response, NextFunction } from 'express';
import pool from '../config/database';
import { RowDataPacket } from 'mysql2';

export const getSystemStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const [userCount] = await pool.query<RowDataPacket[]>('SELECT count(*) as count FROM users');
        const [trainerCount] = await pool.query<RowDataPacket[]>('SELECT count(*) as count FROM users WHERE role = "trainer"');
        const [planCount] = await pool.query<RowDataPacket[]>('SELECT count(*) as count FROM workout_meal_plans');
        const [goalStats] = await pool.query<RowDataPacket[]>(
            'SELECT goal, count(*) as count FROM users GROUP BY goal'
        );

        res.json({
            stats: {
                totalUsers: (userCount as any)[0].count,
                totalTrainers: (trainerCount as any)[0].count,
                totalActivePlans: (planCount as any)[0].count,
                goalDistribution: goalStats
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT id, email, name, role, goal, created_at FROM users ORDER BY created_at DESC'
        );
        res.json({ users: rows });
    } catch (error) {
        next(error);
    }
};

export const updateUserRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
        res.json({ message: 'User role updated successfully' });
    } catch (error) {
        next(error);
    }
};
