import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-management-item-dialog',
    template: `
    <h2 mat-dialog-title>{{ data.mode === 'add' ? 'Add' : 'Edit' }} {{ data.type === 'exercise' ? 'Exercise' : 'Meal' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="form" (ngSubmit)="save()" id="itemForm">
        <div class="form-grid">
          <mat-form-field appearance="outline">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" placeholder="e.g. Jumping Jacks">
          </mat-form-field>

          <mat-form-field appearance="outline" *ngIf="data.type === 'exercise'">
            <mat-label>Category</mat-label>
            <input matInput formControlName="category" placeholder="e.g. Cardio">
          </mat-form-field>

          <mat-form-field appearance="outline" *ngIf="data.type === 'meal'">
            <mat-label>Type</mat-label>
            <mat-select formControlName="type">
              <mat-option value="breakfast">Breakfast</mat-option>
              <mat-option value="lunch">Lunch</mat-option>
              <mat-option value="dinner">Dinner</mat-option>
              <mat-option value="snack">Snack</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Goal</mat-label>
            <mat-select formControlName="goal">
              <mat-option value="weight_loss">Weight Loss</mat-option>
              <mat-option value="muscle_gain">Muscle Gain</mat-option>
              <mat-option value="maintenance">Maintenance</mat-option>
            </mat-select>
          </mat-form-field>

          <ng-container *ngIf="data.type === 'exercise'">
            <mat-form-field appearance="outline">
              <mat-label>Sets</mat-label>
              <input matInput type="number" formControlName="sets">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Reps</mat-label>
              <input matInput type="number" formControlName="reps">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Duration (s)</mat-label>
              <input matInput type="number" formControlName="duration">
            </mat-form-field>
          </ng-container>

          <ng-container *ngIf="data.type === 'meal'">
            <mat-form-field appearance="outline">
              <mat-label>Calories</mat-label>
              <input matInput type="number" formControlName="calories">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Protein (g)</mat-label>
              <input matInput type="number" formControlName="protein">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Carbs (g)</mat-label>
              <input matInput type="number" formControlName="carbs">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Fat (g)</mat-label>
              <input matInput type="number" formControlName="fat">
            </mat-form-field>
          </ng-container>
        </div>

        <mat-form-field appearance="outline" class="full-width" *ngIf="data.type === 'exercise'">
          <mat-label>Instructions</mat-label>
          <textarea matInput formControlName="instructions" rows="3"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width" *ngIf="data.type === 'meal'">
          <mat-label>Ingredients (comma separated)</mat-label>
          <input matInput formControlName="ingredients">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancel</button>
      <button mat-raised-button color="primary" [disabled]="form.invalid" type="submit" form="itemForm">Save</button>
    </mat-dialog-actions>
  `,
    styles: [`
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .full-width { width: 100%; }
    mat-dialog-content { padding-top: 10px !important; }
  `]
})
export class ManagementItemDialogComponent {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ManagementItemDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { type: 'exercise' | 'meal'; mode: 'add' | 'edit'; item?: any }
    ) {
        if (data.type === 'exercise') {
            this.form = this.fb.group({
                name: [data.item?.name || '', Validators.required],
                sets: [data.item?.sets || 3, [Validators.required, Validators.min(1)]],
                reps: [data.item?.reps || 10, [Validators.required, Validators.min(1)]],
                duration: [data.item?.duration || null],
                instructions: [data.item?.instructions || '', Validators.required],
                category: [data.item?.category || '', Validators.required],
                goal: [data.item?.goal || 'weight_loss', Validators.required]
            });
        } else {
            this.form = this.fb.group({
                name: [data.item?.name || '', Validators.required],
                type: [data.item?.type || 'breakfast', Validators.required],
                calories: [data.item?.calories || 0, [Validators.required, Validators.min(0)]],
                protein: [data.item?.protein || 0, [Validators.required, Validators.min(0)]],
                carbs: [data.item?.carbs || 0, [Validators.required, Validators.min(0)]],
                fat: [data.item?.fat || 0, [Validators.required, Validators.min(0)]],
                ingredients: [Array.isArray(data.item?.ingredients) ? data.item.ingredients.join(', ') : '', Validators.required],
                goal: [data.item?.goal || 'weight_loss', Validators.required]
            });
        }
    }

    save(): void {
        if (this.form.valid) {
            const result = this.form.value;
            if (this.data.type === 'meal') {
                result.ingredients = result.ingredients.split(',').map((i: string) => i.trim());
            }
            this.dialogRef.close(result);
        }
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
