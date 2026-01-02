import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="auth-page">
      <div class="auth-left">
        <div class="brand">
          <div class="brand-icon">
            <mat-icon>fitness_center</mat-icon>
          </div>
          <h1>FitPlanner</h1>
        </div>
        <div class="hero-content">
          <h2>Start Your Fitness Journey Today</h2>
          <p>Join thousands of users achieving their fitness goals with personalized plans.</p>
          <div class="stats">
            <div class="stat">
              <span class="stat-value">10K+</span>
              <span class="stat-label">Active Users</span>
            </div>
            <div class="stat">
              <span class="stat-value">500+</span>
              <span class="stat-label">Workouts</span>
            </div>
            <div class="stat">
              <span class="stat-value">1000+</span>
              <span class="stat-label">Meal Plans</span>
            </div>
          </div>
        </div>
      </div>
      <div class="auth-right">
        <div class="auth-card">
          <div class="auth-header">
            <h2>Create Account</h2>
            <p>Fill in your details to get started</p>
          </div>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label>Full Name</label>
              <mat-form-field appearance="outline">
                <input matInput formControlName="name" placeholder="Enter your full name">
                <mat-icon matPrefix>person_outline</mat-icon>
                <mat-error>Name is required</mat-error>
              </mat-form-field>
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <mat-form-field appearance="outline">
                <input matInput formControlName="email" type="email" placeholder="Enter your email">
                <mat-icon matPrefix>mail_outline</mat-icon>
                <mat-error *ngIf="registerForm.get('email')?.hasError('required')">Email is required</mat-error>
                <mat-error *ngIf="registerForm.get('email')?.hasError('email')">Enter a valid email</mat-error>
              </mat-form-field>
            </div>
            <div class="form-group">
              <label>Password</label>
              <mat-form-field appearance="outline">
                <input matInput formControlName="password" [type]="hidePassword ? 'password' : 'text'" placeholder="Create a password">
                <mat-icon matPrefix>lock_outline</mat-icon>
                <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                  <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
                <mat-error *ngIf="registerForm.get('password')?.hasError('required')">Password is required</mat-error>
                <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">Minimum 6 characters</mat-error>
              </mat-form-field>
            </div>
            <div class="form-row">
              <div class="form-group half">
                <label>Age</label>
                <mat-form-field appearance="outline">
                  <input matInput formControlName="age" type="number" placeholder="Your age">
                  <mat-icon matPrefix>cake</mat-icon>
                  <mat-error>Age is required</mat-error>
                </mat-form-field>
              </div>
              <div class="form-group half">
                <label>Gender</label>
                <mat-form-field appearance="outline">
                  <mat-select formControlName="gender" placeholder="Select gender">
                    <mat-option value="male">Male</mat-option>
                    <mat-option value="female">Female</mat-option>
                    <mat-option value="other">Other</mat-option>
                  </mat-select>
                  <mat-icon matPrefix>wc</mat-icon>
                </mat-form-field>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group half">
                <label>Height (cm)</label>
                <mat-form-field appearance="outline">
                  <input matInput formControlName="height" type="number" placeholder="Height in cm">
                  <mat-icon matPrefix>height</mat-icon>
                  <mat-error>Height is required</mat-error>
                </mat-form-field>
              </div>
              <div class="form-group half">
                <label>Weight (kg)</label>
                <mat-form-field appearance="outline">
                  <input matInput formControlName="weight" type="number" placeholder="Weight in kg">
                  <mat-icon matPrefix>monitor_weight</mat-icon>
                  <mat-error>Weight is required</mat-error>
                </mat-form-field>
              </div>
            </div>
            <div class="form-group">
              <label>Fitness Goal</label>
              <mat-form-field appearance="outline">
                <mat-select formControlName="goal" placeholder="Select your goal">
                  <mat-option value="weight_loss">
                    <mat-icon class="goal-icon loss">local_fire_department</mat-icon>
                    Weight Loss
                  </mat-option>
                  <mat-option value="muscle_gain">
                    <mat-icon class="goal-icon gain">fitness_center</mat-icon>
                    Muscle Gain
                  </mat-option>
                  <mat-option value="maintenance">
                    <mat-icon class="goal-icon maintain">balance</mat-icon>
                    Maintenance
                  </mat-option>
                </mat-select>
                <mat-icon matPrefix>flag_outline</mat-icon>
              </mat-form-field>
            </div>
            <button mat-flat-button color="primary" type="submit" class="submit-btn" [disabled]="loading">
              <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
              <span *ngIf="!loading">Create Account</span>
            </button>
          </form>
          <div class="auth-footer">
            <p>Already have an account? <a routerLink="/login">Sign In</a></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .auth-left {
      background: linear-gradient(135deg, #00897b 0%, #004d40 100%);
      padding: 48px;
      display: flex;
      flex-direction: column;
      color: white;
      position: relative;
      overflow: hidden;
    }
    .auth-left::before {
      content: '';
      position: absolute;
      top: -20%;
      right: -20%;
      width: 60%;
      height: 60%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .brand-icon {
      width: 50px;
      height: 50px;
      background: rgba(255,255,255,0.2);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .brand-icon mat-icon { font-size: 28px; }
    .brand h1 { font-size: 1.5rem; font-weight: 700; }
    .hero-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .hero-content h2 {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 20px;
    }
    .hero-content p {
      font-size: 1.1rem;
      opacity: 0.9;
      max-width: 400px;
      margin-bottom: 40px;
    }
    .stats { display: flex; gap: 40px; }
    .stat { text-align: center; }
    .stat-value { display: block; font-size: 2rem; font-weight: 700; }
    .stat-label { font-size: 0.875rem; opacity: 0.8; }
    .auth-right {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px;
      background: #f8fafc;
    }
    .auth-card {
      width: 100%;
      max-width: 480px;
      background: white;
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.06);
      box-sizing: border-box;
    }
    .auth-header { margin-bottom: 28px; }
    .auth-header h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 8px;
    }
    .auth-header p { color: #64748b; }
    .form-group { margin-bottom: 16px; }
    .form-group label {
      display: block;
      font-weight: 500;
      color: #334155;
      margin-bottom: 8px;
      font-size: 0.9rem;
    }
    .form-row {
      display: flex;
      gap: 12px;
      width: 100%;
    }
    .form-group.half {
      flex: 1;
      min-width: 0;
    }
    .form-group.half mat-form-field {
      width: 100%;
    }
    mat-form-field { width: 100%; }
    ::ng-deep .form-group.half .mat-mdc-form-field-infix {
      min-width: 80px !important;
    }
    .goal-icon { margin-right: 8px; font-size: 20px; }
    .goal-icon.loss { color: #ef4444; }
    .goal-icon.gain { color: #5e35b1; }
    .goal-icon.maintain { color: #00897b; }
    .submit-btn {
      width: 100%;
      height: 52px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 12px;
      margin-top: 8px;
    }
    .auth-footer {
      text-align: center;
      margin-top: 24px;
      color: #64748b;
    }
    .auth-footer a {
      color: #5e35b1;
      text-decoration: none;
      font-weight: 600;
    }
    @media (max-width: 900px) {
      .auth-page { grid-template-columns: 1fr; }
      .auth-left { display: none; }
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required, Validators.min(10), Validators.max(120)]],
      gender: ['', Validators.required],
      height: ['', [Validators.required, Validators.min(50), Validators.max(300)]],
      weight: ['', [Validators.required, Validators.min(20), Validators.max(500)]],
      goal: ['maintenance', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.snackBar.open('Account created successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || 'Registration failed', 'Close', { duration: 3000 });
      }
    });
  }
}
