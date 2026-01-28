import pool from './src/config/database';
import dotenv from 'dotenv';
dotenv.config();

async function verify() {
    try {
        const [exercises] = await pool.query('SELECT count(*) as count FROM exercises');
        const [meals] = await pool.query('SELECT count(*) as count FROM meals');

        console.log('--- Database Verification ---');
        console.log('Total Exercises:', (exercises as any)[0].count);
        console.log('Total Meals:', (meals as any)[0].count);

        const [exSample] = await pool.query('SELECT name, goal FROM exercises LIMIT 3');
        console.log('Exercise Sample:', exSample);

        const [mealSample] = await pool.query('SELECT name, goal FROM meals LIMIT 3');
        console.log('Meal Sample:', mealSample);

        process.exit(0);
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
}

verify();
