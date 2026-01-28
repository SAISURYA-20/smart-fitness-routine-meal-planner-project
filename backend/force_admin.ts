import pool from './src/config/database';
import dotenv from 'dotenv';
dotenv.config();

async function forceAdmin() {
    try {
        const [result] = await pool.query('UPDATE users SET role = "admin"');
        console.log('Update result:', result);

        const [users] = await pool.query('SELECT name, email, role FROM users');
        console.log('--- Current Users Matrix ---');
        console.log(JSON.stringify(users, null, 2));
        process.exit(0);
    } catch (error) {
        console.error('Force update failed:', error);
        process.exit(1);
    }
}

forceAdmin();
