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
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

  isPast(timeStr: string): boolean {
    const now = new Date();
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const taskTime = new Date();
    taskTime.setHours(hours, minutes, 0, 0);

    return now > taskTime;
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
