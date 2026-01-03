import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar *ngIf="shouldShowNavbar()"></app-navbar>
    <div class="app-layout" *ngIf="authService.isLoggedIn()">
      <app-sidebar></app-sidebar>
      <main class="main-content">
        <app-header></app-header>
        <div class="page-content">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
    <router-outlet *ngIf="!authService.isLoggedIn()"></router-outlet>
  `,
  styles: [`
    .app-layout {
      display: flex;
      min-height: 100vh;
      background: #f8fafc;
    }
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 260px;
      transition: margin-left 0.3s ease;
    }
    .page-content {
      flex: 1;
      padding: 24px 32px;
      max-width: 1400px;
      width: 100%;
    }
    @media (max-width: 1024px) {
      .main-content { margin-left: 80px; }
    }
    @media (max-width: 768px) {
      .main-content { margin-left: 0; }
      .page-content { padding: 16px; }
    }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) { }

  shouldShowNavbar(): boolean {
    // Show navbar only if logged out AND on specific public pages (landing)
    // Hide on login/register to prevent logo duplication
    if (this.authService.isLoggedIn()) return false;
    const url = this.router.url;
    return url === '/' || url.startsWith('/?');
  }
}
