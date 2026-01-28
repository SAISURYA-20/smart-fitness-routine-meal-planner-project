import { Component, OnInit } from '@angular/core';
import { ManagementService, ExerciseData, MealData } from '../../services/management.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ManagementItemDialogComponent } from './management-item-dialog/management-item-dialog.component';

@Component({
    selector: 'app-trainer-dashboard',
    template: `
    <div class="dashboard-container">
      <h1 class="page-title">Trainer Dashboard</h1>
      <p class="page-subtitle">Manage system-wide exercises and meal plans</p>

      <mat-tab-group animationDuration="0ms">
        <mat-tab label="Exercises">
          <div class="tab-content">
            <div class="actions">
              <button mat-raised-button color="primary" (click)="openAddExercise()">
                <mat-icon>add</mat-icon> Add Exercise
              </button>
            </div>
            
            <div class="list-container">
              <mat-card *ngFor="let ex of exercises" class="item-card">
                <mat-card-header>
                  <mat-card-title>{{ ex.name }}</mat-card-title>
                  <mat-card-subtitle>{{ ex.category }} | {{ ex.goal }}</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <p><strong>Sets:</strong> {{ ex.sets }} | <strong>Reps:</strong> {{ ex.reps }}</p>
                  <p *ngIf="ex.duration"><strong>Duration:</strong> {{ ex.duration }}s</p>
                </mat-card-content>
                <mat-card-actions align="end">
                  <button mat-icon-button color="primary" (click)="editExercise(ex)"><mat-icon>edit</mat-icon></button>
                  <button mat-icon-button color="warn" (click)="deleteExercise(ex.id!)"><mat-icon>delete</mat-icon></button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Meals">
          <div class="tab-content">
            <div class="actions">
              <button mat-raised-button color="primary" (click)="openAddMeal()">
                <mat-icon>add</mat-icon> Add Meal
              </button>
            </div>

            <div class="list-container">
              <mat-card *ngFor="let meal of meals" class="item-card">
                <mat-card-header>
                  <mat-card-title>{{ meal.name }}</mat-card-title>
                  <mat-card-subtitle>{{ meal.type }} | {{ meal.goal }}</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <p><strong>Calories:</strong> {{ meal.calories }} | <strong>P/C/F:</strong> {{ meal.protein }}/{{ meal.carbs }}/{{ meal.fat }}</p>
                </mat-card-content>
                <mat-card-actions align="end">
                  <button mat-icon-button color="primary" (click)="editMeal(meal)"><mat-icon>edit</mat-icon></button>
                  <button mat-icon-button color="warn" (click)="deleteMeal(meal.id!)"><mat-icon>delete</mat-icon></button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
    styles: [`
    .dashboard-container { padding: 24px; max-width: 1200px; margin: 0 auto; }
    .page-title { margin-bottom: 4px; font-weight: 700; }
    .page-subtitle { color: #64748b; margin-bottom: 24px; }
    .tab-content { padding-top: 24px; }
    .actions { margin-bottom: 24px; }
    .list-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
    .item-card { border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: none !important; }
  `]
})
export class TrainerDashboardComponent implements OnInit {
    exercises: ExerciseData[] = [];
    meals: MealData[] = [];

    constructor(
        private managementService: ManagementService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        this.managementService.getExercises().subscribe(res => this.exercises = res.exercises);
        this.managementService.getMeals().subscribe(res => this.meals = res.meals);
    }

    openAddExercise(): void {
        const dialogRef = this.dialog.open(ManagementItemDialogComponent, {
            width: '600px',
            data: { type: 'exercise', mode: 'add' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.managementService.createExercise(result).subscribe(() => {
                    this.snackBar.open('Exercise added', 'Close', { duration: 3000 });
                    this.loadData();
                });
            }
        });
    }

    editExercise(ex: ExerciseData): void {
        const dialogRef = this.dialog.open(ManagementItemDialogComponent, {
            width: '600px',
            data: { type: 'exercise', mode: 'edit', item: ex }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.managementService.updateExercise(ex.id!, result).subscribe(() => {
                    this.snackBar.open('Exercise updated', 'Close', { duration: 3000 });
                    this.loadData();
                });
            }
        });
    }

    deleteExercise(id: number): void {
        if (confirm('Are you sure you want to delete this exercise?')) {
            this.managementService.deleteExercise(id).subscribe(() => {
                this.snackBar.open('Exercise deleted', 'Close', { duration: 3000 });
                this.loadData();
            });
        }
    }

    openAddMeal(): void {
        const dialogRef = this.dialog.open(ManagementItemDialogComponent, {
            width: '600px',
            data: { type: 'meal', mode: 'add' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.managementService.createMeal(result).subscribe(() => {
                    this.snackBar.open('Meal added', 'Close', { duration: 3000 });
                    this.loadData();
                });
            }
        });
    }

    editMeal(meal: MealData): void {
        const dialogRef = this.dialog.open(ManagementItemDialogComponent, {
            width: '600px',
            data: { type: 'meal', mode: 'edit', item: meal }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.managementService.updateMeal(meal.id!, result).subscribe(() => {
                    this.snackBar.open('Meal updated', 'Close', { duration: 3000 });
                    this.loadData();
                });
            }
        });
    }

    deleteMeal(id: number): void {
        if (confirm('Are you sure you want to delete this meal?')) {
            this.managementService.deleteMeal(id).subscribe(() => {
                this.snackBar.open('Meal deleted', 'Close', { duration: 3000 });
                this.loadData();
            });
        }
    }
}
