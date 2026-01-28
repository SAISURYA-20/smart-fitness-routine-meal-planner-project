import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'K@Surya20',
  database: process.env.DB_NAME || 'fitness_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

import { seedDatabase } from '../database/seeder';

export const initDatabase = async (): Promise<void> => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'K@Surya20'
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'fitness_app'}`);
    await connection.end();

    // Create tables if they don't exist (preserves existing data)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        age INT DEFAULT NULL,
        gender ENUM('male', 'female', 'other') DEFAULT NULL,
        height DECIMAL(5,2) DEFAULT NULL,
        weight DECIMAL(5,2) DEFAULT NULL,
        goal ENUM('weight_loss', 'muscle_gain', 'maintenance') DEFAULT 'maintenance',
        role ENUM('user', 'trainer', 'admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS workout_meal_plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
        exercises JSON,
        meals JSON,
        schedule JSON,
        completed_status JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_day (user_id, day)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS exercises (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        sets INT NOT NULL,
        reps INT NOT NULL,
        duration INT DEFAULT NULL,
        instructions TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        goal ENUM('weight_loss', 'muscle_gain', 'maintenance') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS meals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type ENUM('breakfast', 'lunch', 'dinner', 'snack') NOT NULL,
        calories INT NOT NULL,
        protein INT NOT NULL,
        carbs INT NOT NULL,
        fat INT NOT NULL,
        ingredients JSON NOT NULL,
        goal ENUM('weight_loss', 'muscle_gain', 'maintenance') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await seedDatabase();

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

export default pool;
