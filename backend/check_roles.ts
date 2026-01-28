import pool from './src/config/database';
import dotenv from 'dotenv';
dotenv.config();

async function checkRoles() {
    try {
        const [users] = await pool.query('SELECT name, email, role FROM users');
        console.log('--- Current User Roles ---');
        console.log(JSON.stringify(users, null, 2));
        process.exit(0);
    } catch (error) {
        console.error('Check failed:', error);
        process.exit(1);
    }
}

checkRoles();
