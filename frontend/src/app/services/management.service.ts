import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ExerciseData {
    id?: number;
    name: string;
    sets: number;
    reps: number;
    duration?: number;
    instructions: string;
    category: string;
    goal: string;
}

export interface MealData {
    id?: number;
    name: string;
    type: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    ingredients: string[];
    goal: string;
}

@Injectable({ providedIn: 'root' })
export class ManagementService {
    private baseUrl = `${environment.apiUrl}/management`;

    constructor(private http: HttpClient) { }

    // Exercises
    getExercises(): Observable<{ exercises: ExerciseData[] }> {
        return this.http.get<{ exercises: ExerciseData[] }>(`${this.baseUrl}/exercises`);
    }

    createExercise(exercise: ExerciseData): Observable<any> {
        return this.http.post(`${this.baseUrl}/exercises`, exercise);
    }

    updateExercise(id: number, exercise: ExerciseData): Observable<any> {
        return this.http.put(`${this.baseUrl}/exercises/${id}`, exercise);
    }

    deleteExercise(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/exercises/${id}`);
    }

    // Meals
    getMeals(): Observable<{ meals: MealData[] }> {
        return this.http.get<{ meals: MealData[] }>(`${this.baseUrl}/meals`);
    }

    createMeal(meal: MealData): Observable<any> {
        return this.http.post(`${this.baseUrl}/meals`, meal);
    }

    updateMeal(id: number, meal: MealData): Observable<any> {
        return this.http.put(`${this.baseUrl}/meals/${id}`, meal);
    }

    deleteMeal(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/meals/${id}`);
    }
}
