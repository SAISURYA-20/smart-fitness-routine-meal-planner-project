import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  template: `
    <div class="profile-page">
      <div class="page-header">
        <h1 class="page-title">My Profile 👤</h1>
        <p class="page-subtitle">View and manage your personal information</p>
      </div>

      <div class="profile-content">
        <!-- View Mode -->
        <div class="card profile-card" *ngIf="!editMode">
          <div class="card-header">
            <h3><mat-icon>person</mat-icon> Personal Information</h3>
          </div>
          <div class="card-body">
            <div class="profile-avatar">
              <div class="avatar">{{ getInitials() }}</div>
              <div class="avatar-info">
                <h2>{{ user?.name || 'User' }}</h2>
                <span class="email">{{ user?.email }}</span>
              </div>
            </div>

            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Age</span>
                <span class="info-value">{{ user?.age || 'Not set' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Gender</span>
                <span class="info-value">{{ getGenderLabel() }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Height</span>
                <span class="info-value">{{ user?.height ? (user?.height + ' cm') : 'Not set' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Weight</span>
                <span class="info-value">{{ user?.weight ? (user?.weight + ' kg') : 'Not set' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Fitness Goal</span>
                <span class="info-value goal-badge">{{ getGoalLabel() }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">BMI</span>
                <span class="info-value" [ngClass]="getBMIClass()">{{ calculateBMI() }} ({{ getBMILabel() }})</span>
              </div>
            </div>

            <button class="edit-btn" (click)="editMode = true">
              <mat-icon>edit</mat-icon>
              Edit Profile
            </button>
          </div>
        </div>

        <!-- Edit Mode -->
        <div class="card profile-card" *ngIf="editMode">
          <div class="card-header">
            <h3><mat-icon>edit</mat-icon> Edit Profile</h3>
            <button class="cancel-btn" (click)="cancelEdit()">
              <mat-icon>close</mat-icon>
            </button>
          </div>
          <div class="card-body">
            <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
              <div class="form-row">
                <div class="form-group">
                  <label>Full Name *</label>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="name" placeholder="Enter your name">
                    <mat-error>Name is required</mat-error>
                  </mat-form-field>
                </div>
                <div class="form-group">
                  <label>Age</label>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="age" type="number" placeholder="Your age">
                  </mat-form-field>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Gender</label>
                  <mat-form-field appearance="outline">
                    <mat-select formControlName="gender" placeholder="Select gender">
                      <mat-option value="male">Male</mat-option>
                      <mat-option value="female">Female</mat-option>
                      <mat-option value="other">Other</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
                <div class="form-group">
                  <label>Height (cm)</label>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="height" type="number" placeholder="Height in cm">
                  </mat-form-field>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Weight (kg)</label>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="weight" type="number" placeholder="Weight in kg">
                  </mat-form-field>
                </div>
                <div class="form-group">
                  <label>Fitness Goal *</label>
                  <mat-form-field appearance="outline">
                    <mat-select formControlName="goal">
                      <mat-option value="weight_loss">🔥 Weight Loss</mat-option>
                      <mat-option value="muscle_gain">💪 Muscle Gain</mat-option>
                      <mat-option value="maintenance">⚖️ Maintenance</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
              </div>
              <button class="save-btn" type="submit" [disabled]="loading || profileForm.invalid">
                <mat-spinner *ngIf="loading" diameter="18"></mat-spinner>
                <mat-icon *ngIf="!loading">check</mat-icon>
                {{ loading ? 'Saving...' : 'Save Changes' }}
              </button>
            </form>
          </div>
        </div>

        <!-- Account Info Card -->
        <div class="card info-card">
          <div class="card-header"><h3><mat-icon>info</mat-icon> Account Info</h3></div>
          <div class="card-body">
            <div class="account-row">
              <span class="account-label">Account Type</span>
              <span class="account-value badge">{{ user?.role | titlecase }}</span>
            </div>
            <div class="account-row">
              <span class="account-label">Email</span>
              <span class="account-value">{{ user?.email }}</span>
            </div>
            <div class="account-row" *ngIf="user?.created_at">
              <span class="account-label">Member Since</span>
              <span class="account-value">{{ user?.created_at | date:'mediumDate' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-page { max-width: 900px; }
    .page-header { margin-bottom: 24px; }
    .page-title { font-size: 1.5rem; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
    .page-subtitle { color: #64748b; font-size: 0.9rem; }

    .profile-content { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; }

    .card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; }
    .card-header { padding: 16px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
    .card-header h3 { display: flex; align-items: center; gap: 8px; font-size: 0.95rem; font-weight: 600; color: #1e293b; margin: 0; }
    .card-header mat-icon { font-size: 18px; width: 18px; height: 18px; color: #64748b; }
    .card-body { padding: 24px; }

    .profile-avatar { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #f1f5f9; }
    .avatar { width: 64px; height: 64px; background: linear-gradient(135deg, #2563eb, #3b82f6); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: 700; }
    .avatar-info h2 { font-size: 1.25rem; font-weight: 700; color: #1e293b; margin: 0 0 4px 0; }
    .avatar-info .email { color: #64748b; font-size: 0.9rem; }

    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
    .info-item { }
    .info-label { display: block; font-size: 0.75rem; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
    .info-value { display: block; font-size: 1rem; font-weight: 600; color: #1e293b; }
    .info-value.goal-badge { color: #2563eb; }
    .info-value.normal { color: #10b981; }
    .info-value.underweight { color: #3b82f6; }
    .info-value.overweight { color: #f59e0b; }
    .info-value.obese { color: #ef4444; }

    .edit-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 14px; background: #f8fafc; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 10px; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; }
    .edit-btn:hover { background: #2563eb; color: white; border-color: #2563eb; }
    .edit-btn mat-icon { font-size: 18px; width: 18px; height: 18px; }

    .cancel-btn { background: none; border: none; cursor: pointer; color: #64748b; padding: 4px; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
    .cancel-btn:hover { background: #f1f5f9; color: #1e293b; }
    .cancel-btn mat-icon { font-size: 20px; width: 20px; height: 20px; }

    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 8px; }
    .form-group { display: flex; flex-direction: column; }
    .form-group label { font-size: 0.85rem; font-weight: 500; color: #374151; margin-bottom: 6px; }
    mat-form-field { width: 100%; }

    .save-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 14px; background: #2563eb; color: white; border: none; border-radius: 10px; font-weight: 600; font-size: 0.9rem; cursor: pointer; margin-top: 8px; transition: background 0.2s; }
    .save-btn:hover { background: #1d4ed8; }
    .save-btn:disabled { opacity: 0.7; cursor: not-allowed; }
    .save-btn mat-icon { font-size: 18px; width: 18px; height: 18px; }

    .info-card { height: fit-content; }
    .account-row { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid #f1f5f9; }
    .account-row:last-child { border-bottom: none; }
    .account-label { color: #64748b; font-size: 0.9rem; }
    .account-value { font-weight: 600; color: #1e293b; font-size: 0.9rem; }
    .account-value.badge { background: #e0e7ff; color: #4f46e5; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; }

    @media (max-width: 768px) {
      .profile-content { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
      .info-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  editMode = false;
  user: User | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      age: [null],
      gender: [''],
      height: [null],
      weight: [null],
      goal: ['maintenance', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.authService.getProfile().subscribe({
      next: (res) => { this.user = res.user; this.profileForm.patchValue(res.user); },
      error: () => this.snackBar.open('Failed to load profile', 'Close', { duration: 3000 })
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;
    this.loading = true;
    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.user = res.user;
        this.editMode = false;
        this.snackBar.open('Profile saved successfully!', 'Close', { duration: 3000 });
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to save profile', 'Close', { duration: 3000 });
      }
    });
  }

  cancelEdit(): void {
    this.editMode = false;
    if (this.user) this.profileForm.patchValue(this.user);
  }

  getInitials(): string {
    const name = this.user?.name || 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  getGenderLabel(): string {
    const labels: Record<string, string> = { male: 'Male', female: 'Female', other: 'Other' };
    return labels[this.user?.gender || ''] || 'Not set';
  }

  getGoalLabel(): string {
    const labels: Record<string, string> = { weight_loss: '🔥 Weight Loss', muscle_gain: '💪 Muscle Gain', maintenance: '⚖️ Maintenance' };
    return labels[this.user?.goal || 'maintenance'] || 'Not Set';
  }

  calculateBMI(): string {
    if (!this.user?.height || !this.user?.weight) return 'N/A';
    const h = this.user.height / 100;
    return (this.user.weight / (h * h)).toFixed(1);
  }

  getBMIClass(): string {
    const bmi = parseFloat(this.calculateBMI());
    if (isNaN(bmi)) return '';
    if (bmi < 18.5) return 'underweight';
    if (bmi < 25) return 'normal';
    if (bmi < 30) return 'overweight';
    return 'obese';
  }

  getBMILabel(): string {
    const bmi = parseFloat(this.calculateBMI());
    if (isNaN(bmi)) return '';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  }
}
