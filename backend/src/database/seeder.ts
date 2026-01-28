import pool from '../config/database';

const exerciseData = [
    { name: 'Jumping Jacks', sets: 3, reps: 30, instructions: 'Stand with feet together, jump while spreading arms and legs, return to start.', category: 'cardio', goal: 'weight_loss' },
    { name: 'Burpees', sets: 3, reps: 10, instructions: 'Start standing, drop to push-up, jump back up with arms overhead.', category: 'cardio', goal: 'weight_loss' },
    { name: 'Mountain Climbers', sets: 3, reps: 20, instructions: 'In plank position, alternate bringing knees to chest rapidly.', category: 'cardio', goal: 'weight_loss' },
    { name: 'High Knees', sets: 3, reps: 30, instructions: 'Run in place, bringing knees up to hip level.', category: 'cardio', goal: 'weight_loss' },
    { name: 'Plank', sets: 3, reps: 1, duration: 45, instructions: 'Hold push-up position with arms straight, keep body in line.', category: 'core', goal: 'weight_loss' },
    { name: 'Bicycle Crunches', sets: 3, reps: 20, instructions: 'Lie on back, alternate touching elbow to opposite knee.', category: 'core', goal: 'weight_loss' },
    { name: 'Jump Rope', sets: 3, reps: 1, duration: 60, instructions: 'Jump rope continuously for the duration.', category: 'cardio', goal: 'weight_loss' },
    { name: 'Squat Jumps', sets: 3, reps: 15, instructions: 'Perform a squat, then explosively jump up.', category: 'legs', goal: 'weight_loss' },
    { name: 'Push-ups', sets: 4, reps: 15, instructions: 'Keep body straight, lower chest to ground, push back up.', category: 'chest', goal: 'muscle_gain' },
    { name: 'Pull-ups', sets: 4, reps: 8, instructions: 'Hang from bar, pull chin above bar, lower with control.', category: 'back', goal: 'muscle_gain' },
    { name: 'Squats', sets: 4, reps: 12, instructions: 'Feet shoulder-width, lower until thighs parallel, stand up.', category: 'legs', goal: 'muscle_gain' },
    { name: 'Lunges', sets: 4, reps: 10, instructions: 'Step forward, lower back knee toward ground, push back.', category: 'legs', goal: 'muscle_gain' },
    { name: 'Dips', sets: 4, reps: 10, instructions: 'Lower body between parallel bars, push back up.', category: 'triceps', goal: 'muscle_gain' },
    { name: 'Deadlifts', sets: 4, reps: 8, instructions: 'Hinge at hips, keep back straight, lift weight from ground.', category: 'back', goal: 'muscle_gain' },
    { name: 'Shoulder Press', sets: 4, reps: 10, instructions: 'Press weights overhead from shoulder level.', category: 'shoulders', goal: 'muscle_gain' },
    { name: 'Bicep Curls', sets: 3, reps: 12, instructions: 'Curl weights toward shoulders, lower with control.', category: 'arms', goal: 'muscle_gain' },
    { name: 'Walking', sets: 1, reps: 1, duration: 30, instructions: 'Walk at moderate pace for 30 minutes.', category: 'cardio', goal: 'maintenance' },
    { name: 'Bodyweight Squats', sets: 3, reps: 15, instructions: 'Standard squat without weights.', category: 'legs', goal: 'maintenance' },
    { name: 'Push-ups', sets: 3, reps: 10, instructions: 'Standard push-up form.', category: 'chest', goal: 'maintenance' },
    { name: 'Plank', sets: 3, reps: 1, duration: 30, instructions: 'Hold plank position.', category: 'core', goal: 'maintenance' },
    { name: 'Stretching', sets: 1, reps: 1, duration: 15, instructions: 'Full body stretching routine.', category: 'flexibility', goal: 'maintenance' },
    { name: 'Yoga Flow', sets: 1, reps: 1, duration: 20, instructions: 'Basic yoga sequence.', category: 'flexibility', goal: 'maintenance' }
];

const mealData = [
    { name: 'Oats Idli with Mint Chutney', type: 'breakfast', calories: 220, protein: 8, carbs: 35, fat: 4, ingredients: ['Oats', 'Curd', 'Mint', 'Green chilies'], goal: 'weight_loss' },
    { name: 'Ragi Dosa', type: 'breakfast', calories: 250, protein: 6, carbs: 40, fat: 5, ingredients: ['Ragi flour', 'Urad dal', 'Onions'], goal: 'weight_loss' },
    { name: 'Sambar Rice with Cucumber Salad', type: 'lunch', calories: 400, protein: 12, carbs: 60, fat: 10, ingredients: ['Rice', 'Toor dal', 'Mixed vegetables', 'Cucumber'], goal: 'weight_loss' },
    { name: 'Quinoa lemon rice', type: 'lunch', calories: 350, protein: 10, carbs: 50, fat: 8, ingredients: ['Quinoa', 'Lemon', 'Peanuts', 'Curry leaves'], goal: 'weight_loss' },
    { name: 'Grilled Fish with Steamed Veggies', type: 'dinner', calories: 350, protein: 30, carbs: 10, fat: 15, ingredients: ['Fish', 'Beans', 'Carrots', 'Pepper'], goal: 'weight_loss' },
    { name: 'Millet Upma', type: 'dinner', calories: 300, protein: 8, carbs: 45, fat: 7, ingredients: ['Foxtail millet', 'Carrots', 'Peas', 'Ginger'], goal: 'weight_loss' },
    { name: 'Masala Buttermilk', type: 'snack', calories: 60, protein: 2, carbs: 5, fat: 3, ingredients: ['Curd', 'Ginger', 'Curry leaves', 'Asafoetida'], goal: 'weight_loss' },
    { name: 'Sprouted Moong Salad', type: 'snack', calories: 120, protein: 8, carbs: 18, fat: 1, ingredients: ['Moong sprouts', 'Tomato', 'Lemon juice'], goal: 'weight_loss' },
    { name: 'Egg Dosa (2 pcs)', type: 'breakfast', calories: 500, protein: 20, carbs: 50, fat: 18, ingredients: ['Dosa batter', 'Eggs', 'Pepper', 'Oil'], goal: 'muscle_gain' },
    { name: 'Paneer Paratha with Curd', type: 'breakfast', calories: 550, protein: 22, carbs: 55, fat: 25, ingredients: ['Whole wheat flour', 'Paneer', 'Spices', 'Curd'], goal: 'muscle_gain' },
    { name: 'Chicken Chettinad with Brown Rice', type: 'lunch', calories: 700, protein: 45, carbs: 65, fat: 25, ingredients: ['Chicken', 'Brown Rice', 'Coconut', 'Spices'], goal: 'muscle_gain' },
    { name: 'Soya Chunks Biryani', type: 'lunch', calories: 650, protein: 35, carbs: 70, fat: 18, ingredients: ['Basmati Rice', 'Soya chunks', 'Mint', 'Yogurt'], goal: 'muscle_gain' },
    { name: 'Fish Curry with Chapati', type: 'dinner', calories: 600, protein: 40, carbs: 50, fat: 20, ingredients: ['Fish', 'Wheat flour', 'Tamarind', 'Spices'], goal: 'muscle_gain' },
    { name: 'Egg Curry with Appam', type: 'dinner', calories: 550, protein: 25, carbs: 60, fat: 18, ingredients: ['Eggs', 'Rice flour', 'Coconut milk'], goal: 'muscle_gain' },
    { name: 'Sundal (Chickpeas)', type: 'snack', calories: 250, protein: 12, carbs: 35, fat: 5, ingredients: ['Chickpeas', 'Coconut', 'Mustard seeds'], goal: 'muscle_gain' },
    { name: 'Peanut Chikki', type: 'snack', calories: 300, protein: 10, carbs: 25, fat: 18, ingredients: ['Peanuts', 'Jaggery'], goal: 'muscle_gain' },
    { name: 'Idli with Sambar', type: 'breakfast', calories: 300, protein: 10, carbs: 55, fat: 2, ingredients: ['Rice', 'Urad dal', 'Toor dal', 'Vegetables'], goal: 'maintenance' },
    { name: 'Pongal with Chutney', type: 'breakfast', calories: 400, protein: 8, carbs: 60, fat: 15, ingredients: ['Rice', 'Moong dal', 'Ghee', 'Peppercorns'], goal: 'maintenance' },
    { name: 'Curd Rice with Pomegranate', type: 'lunch', calories: 350, protein: 8, carbs: 55, fat: 10, ingredients: ['Rice', 'Curd', 'Pomegranate', 'Mustard seeds'], goal: 'maintenance' },
    { name: 'Lemon Rice with Papad', type: 'lunch', calories: 400, protein: 6, carbs: 65, fat: 12, ingredients: ['Rice', 'Lemon', 'Peanuts', 'Turmeric'], goal: 'maintenance' },
    { name: 'Chapati with Mixed Veg Curry', type: 'dinner', calories: 450, protein: 12, carbs: 60, fat: 15, ingredients: ['Wheat flour', 'Carrot', 'Beans', 'Potato'], goal: 'maintenance' },
    { name: 'Dosa with Tomato Chutney', type: 'dinner', calories: 400, protein: 8, carbs: 65, fat: 10, ingredients: ['Rice batter', 'Tomatoes', 'Red chilies'], goal: 'maintenance' },
    { name: 'Filter Coffee', type: 'snack', calories: 100, protein: 2, carbs: 12, fat: 4, ingredients: ['Coffee powder', 'Milk', 'Sugar'], goal: 'maintenance' },
    { name: 'Banana Chips (Small Portion)', type: 'snack', calories: 150, protein: 1, carbs: 25, fat: 8, ingredients: ['Raw banana', 'Coconut oil', 'Salt'], goal: 'maintenance' }
];

export const seedDatabase = async () => {
    try {
        const [exercises] = await pool.query('SELECT count(*) as count FROM exercises');
        if ((exercises as any)[0].count === 0) {
            console.log('Seeding exercises...');
            for (const ex of exerciseData) {
                await pool.query(
                    'INSERT INTO exercises (name, sets, reps, duration, instructions, category, goal) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [ex.name, ex.sets, ex.reps, ex.duration || null, ex.instructions, ex.category, ex.goal]
                );
            }
        }

        const [meals] = await pool.query('SELECT count(*) as count FROM meals');
        if ((meals as any)[0].count === 0) {
            console.log('Seeding meals...');
            for (const meal of mealData) {
                await pool.query(
                    'INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients, goal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [meal.name, meal.type, meal.calories, meal.protein, meal.carbs, meal.fat, JSON.stringify(meal.ingredients), meal.goal]
                );
            }
        }
        console.log('Seeding completed successfully');
    } catch (error) {
        console.error('Seeding error:', error);
    }
};
