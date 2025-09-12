import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard').then(m => m.DashboardComponent) },
      { path: 'users', loadComponent: () => import('./features/users').then(m => m.UsersComponent) },
      { path: 'contents', loadComponent: () => import('./features/contents').then(m => m.ContentsComponent) },
      { path: 'badges', loadComponent: () => import('./features/badges').then(m => m.BadgesComponent) },
      { path: 'reports', loadComponent: () => import('./features/reports').then(m => m.ReportsComponent) },
      { path: 'settings', loadComponent: () => import('./features/settings').then(m => m.SettingsComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent)
  },
  { path: '**', redirectTo: 'dashboard' }
];
