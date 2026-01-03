import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meal } from '../../../models/user.model';

@Component({
    selector: 'app-meal-edit-dialog',
    templateUrl: './meal-edit-dialog.component.html',
    styleUrls: ['./meal-edit-dialog.component.scss']
})
export class MealEditDialogComponent {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<MealEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { meal: Meal }
    ) {
        this.form = this.fb.group({
            name: [data.meal.name, Validators.required],
            calories: [data.meal.calories, [Validators.required, Validators.min(0)]],
            protein: [data.meal.protein, [Validators.required, Validators.min(0)]],
            carbs: [data.meal.carbs, [Validators.required, Validators.min(0)]],
            fat: [data.meal.fat, [Validators.required, Validators.min(0)]]
        });
    }

    save(): void {
        if (this.form.valid) {
            this.dialogRef.close(this.form.value);
        }
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
