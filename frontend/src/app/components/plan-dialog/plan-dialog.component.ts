// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-plan-dialog',
//   templateUrl: './plan-dialog.component.html',
//   styleUrls: ['./plan-dialog.component.css']
// })
// export class PlanDialogComponent {

// }




import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DayPlan } from '../../models/user.model';

@Component({
  selector: 'app-plan-dialog',
  templateUrl: './plan-dialog.component.html',
  styleUrls: ['./plan-dialog.component.scss']
})
export class PlanDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PlanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DayPlan
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  getIcon(type: string): string {
    switch (type) {
      case 'meal': return 'restaurant';
      case 'workout': return 'fitness_center';
      case 'other': return 'schedule';
      default: return 'circle';
    }
  }
}
