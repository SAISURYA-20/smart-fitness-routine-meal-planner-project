import pool from '../config/database';
import { Exercise, Meal, ScheduleItem } from '../types';
import { RowDataPacket } from 'mysql2';

export const generateWeeklyPlan = async (goal: string): Promise<{ day: string; exercises: Exercise[]; meals: Meal[]; schedule: ScheduleItem[] }[]> => {
  const [exerciseRows] = await pool.query<RowDataPacket[]>('SELECT * FROM exercises WHERE goal = ?', [goal]);
  const [mealRows] = await pool.query<RowDataPacket[]>('SELECT * FROM meals WHERE goal = ?', [goal]);

  let exercises = exerciseRows as Exercise[];
  let meals = mealRows as Meal[];

  // Fallback to maintenance if no data for goal
  if (exercises.length === 0) {
    const [mEx] = await pool.query<RowDataPacket[]>('SELECT * FROM exercises WHERE goal = "maintenance"');
    exercises = mEx as Exercise[];
  }
  if (meals.length === 0) {
    const [mMeal] = await pool.query<RowDataPacket[]>('SELECT * FROM meals WHERE goal = "maintenance"');
    meals = mMeal as Meal[];
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return days.map((day, index) => {
    const dayExercises = getExercisesForDay(exercises, index, goal);
    const dayMeals = getMealsForDay(meals, index);
    const daySchedule = generateDailySchedule(day, goal, dayMeals, dayExercises);
    return { day, exercises: dayExercises, meals: dayMeals, schedule: daySchedule };
  });
};

const generateDailySchedule = (day: string, goal: string, meals: Meal[], exercises: Exercise[]): ScheduleItem[] => {
  if (day === 'Sunday') {
    return [
      { time: '08:00 AM', activity: 'Wake Up', detail: 'Consistent wake-up time', type: 'other' },
      { time: '08:30 AM', activity: 'Breakfast', detail: meals.find(m => m.type === 'breakfast')?.name || 'Healthy Breakfast', type: 'meal' },
      { time: '01:00 PM', activity: 'Lunch', detail: meals.find(m => m.type === 'lunch')?.name || 'Balanced Lunch', type: 'meal' },
      { time: '04:00 PM', activity: 'Active Recovery', detail: 'Light stretching or walking', type: 'workout' },
      { time: '07:30 PM', activity: 'Dinner', detail: meals.find(m => m.type === 'dinner')?.name || 'Light Dinner', type: 'meal' },
      { time: '10:30 PM', activity: 'Sleep', detail: '7-8 hours of quality sleep', type: 'other' }
    ];
  }

  const schedule: ScheduleItem[] = [];
  const breakfast = meals.find(m => m.type === 'breakfast');
  const lunch = meals.find(m => m.type === 'lunch');
  const dinner = meals.find(m => m.type === 'dinner');
  const snack = meals.find(m => m.type === 'snack');

  const isMorningWorkout = goal === 'weight_loss';

  schedule.push({ time: '06:30 AM', activity: 'Wake Up', detail: 'Hydrate immediately with 500ml water', type: 'other' });

  if (isMorningWorkout) {
    schedule.push({ time: '07:00 AM', activity: 'Morning Workout', detail: 'Complete today\'s exercise routine', type: 'workout' });
    schedule.push({ time: '08:30 AM', activity: 'Breakfast', detail: breakfast?.name || 'High Protein Breakfast', type: 'meal' });
  } else {
    schedule.push({ time: '07:30 AM', activity: 'Breakfast', detail: breakfast?.name || 'Balanced Breakfast', type: 'meal' });
  }

  schedule.push({ time: '11:00 AM', activity: 'Morning Snack', detail: snack?.name || 'Fruit or Nuts', type: 'meal' });
  schedule.push({ time: '01:00 PM', activity: 'Lunch', detail: lunch?.name || 'Nutritious Lunch', type: 'meal' });

  if (!isMorningWorkout) {
    schedule.push({ time: '05:30 PM', activity: 'Pre-Workout Snack', detail: 'Banana or Light carb source', type: 'meal' });
    schedule.push({ time: '06:30 PM', activity: 'Evening Workout', detail: 'Complete today\'s exercise routine', type: 'workout' });
    schedule.push({ time: '08:00 PM', activity: 'Dinner', detail: dinner?.name || 'Recovery Meal', type: 'meal' });
  } else {
    schedule.push({ time: '07:00 PM', activity: 'Dinner', detail: dinner?.name || 'Light Dinner', type: 'meal' });
  }

  schedule.push({ time: '10:00 PM', activity: 'Sleep', detail: 'Wind down and disconnect', type: 'other' });

  return schedule;
};

const getExercisesForDay = (exercises: Exercise[], dayIndex: number, goal: string): Exercise[] => {
  if (dayIndex === 6) return []; // Rest day

  const numExercises = goal === 'muscle_gain' ? 5 : goal === 'weight_loss' ? 4 : 3;
  if (exercises.length === 0) return [];

  const startIndex = (dayIndex * 2) % exercises.length;
  const selected: Exercise[] = [];

  for (let i = 0; i < numExercises; i++) {
    const ex = exercises[(startIndex + i) % exercises.length];
    selected.push({ ...ex, id: `${ex.id}-${dayIndex}` });
  }
  return selected;
};

const getMealsForDay = (meals: Meal[], dayIndex: number): Meal[] => {
  const breakfast = meals.filter(m => m.type === 'breakfast');
  const lunch = meals.filter(m => m.type === 'lunch');
  const dinner = meals.filter(m => m.type === 'dinner');
  const snacks = meals.filter(m => m.type === 'snack');

  if (breakfast.length === 0 || lunch.length === 0 || dinner.length === 0) return [];

  return [
    { ...breakfast[dayIndex % breakfast.length], id: `${breakfast[dayIndex % breakfast.length].id}-${dayIndex}` },
    { ...lunch[dayIndex % lunch.length], id: `${lunch[dayIndex % lunch.length].id}-${dayIndex}` },
    { ...dinner[dayIndex % dinner.length], id: `${dinner[dayIndex % dinner.length].id}-${dayIndex}` },
    { ...snacks[dayIndex % (snacks.length || 1)], id: snacks.length > 0 ? `${snacks[dayIndex % snacks.length].id}-${dayIndex}` : 'no-snack' }
  ];
};

export const calculateDailyCalories = (goal: string, weight: number): number => {
  const baseCalories = (weight || 70) * 24;
  switch (goal) {
    case 'weight_loss': return Math.round(baseCalories * 0.8);
    case 'muscle_gain': return Math.round(baseCalories * 1.2);
    default: return Math.round(baseCalories);
  }
};
