import { Component, OnInit } from '@angular/core';
import { AdminService, SystemStats } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-admin-dashboard',
    template: `
    <div class="dashboard-container">
      <h1 class="page-title">Admin Dashboard</h1>
      <p class="page-subtitle">System overview and user management</p>

      <div class="stats-grid" *ngIf="stats">
        <mat-card class="stat-card">
          <div class="stat-label">Total Users</div>
          <div class="stat-value">{{ stats.totalUsers }}</div>
        </mat-card>
        <mat-card class="stat-card">
          <div class="stat-label">Total Trainers</div>
          <div class="stat-value">{{ stats.totalTrainers }}</div>
        </mat-card>
        <mat-card class="stat-card">
          <div class="stat-label">Active Plans</div>
          <div class="stat-value">{{ stats.totalActivePlans }}</div>
        </mat-card>
      </div>

      <mat-card class="users-card">
        <mat-card-header>
          <mat-card-title>User Management</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table class="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Goal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of users">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <mat-form-field appearance="outline" class="role-select">
                    <mat-select [(value)]="user.role" (selectionChange)="changeRole(user.id, $event.value)">
                      <mat-option value="user">User</mat-option>
                      <mat-option value="trainer">Trainer</mat-option>
                      <mat-option value="admin">Admin</mat-option>
                    </mat-select>
                  </mat-form-field>
                </td>
                <td>{{ user.goal }}</td>
                <td>
                  <button mat-icon-button color="warn"><mat-icon>delete</mat-icon></button>
                </td>
              </tr>
            </tbody>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
    styles: [`
    .dashboard-container { padding: 24px; max-width: 1200px; margin: 0 auto; }
    .page-title { margin-bottom: 4px; font-weight: 700; }
    .page-subtitle { color: #64748b; margin-bottom: 24px; }
    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
    .stat-card { padding: 20px; text-align: center; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: none !important; }
    .stat-label { font-size: 0.875rem; color: #64748b; margin-bottom: 8px; }
    .stat-value { font-size: 2rem; font-weight: 700; color: #1e293b; }
    .users-card { border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: none !important; }
    .users-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    .users-table th { text-align: left; padding: 12px; color: #64748b; font-size: 0.875rem; border-bottom: 1px solid #f1f5f9; }
    .users-table td { padding: 12px; border-bottom: 1px solid #f1f5f9; }
    .role-select { width: 120px; margin: 0; }
    ::ng-deep .role-select .mat-mdc-form-field-subscript-wrapper { display: none; }
  `]
})
export class AdminDashboardComponent implements OnInit {
    stats: SystemStats | null = null;
    users: any[] = [];

    constructor(private adminService: AdminService, private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.adminService.getStats().subscribe(res => this.stats = res.stats);
        this.adminService.getUsers().subscribe(res => this.users = res.users);
    }

    changeRole(userId: number, role: string): void {
        this.adminService.updateUserRole(userId, role).subscribe(() => {
            this.snackBar.open('User role updated', 'Close', { duration: 3000 });
        });
    }
}
