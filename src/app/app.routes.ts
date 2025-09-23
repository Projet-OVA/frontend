import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  // Redirection de la racine vers le dashboard (après login)
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
  // Route pour le login (sans protection)
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then((m) => m.LoginComponent),
  },
  
  // Routes protégées avec le layout admin
  {
    path: '',
    loadComponent: () => import('./layouts/admin-layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('./features/users/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'courses',
        loadComponent: () => import('./features/courses/courses.component').then((m) => m.CoursesComponent),
      },
      {
        path: 'challenges',
        loadComponent: () => import('./features/challenges/challenges.component').then((m) => m.ChallengesComponent),
      },
      {
        path: 'badges',
        loadComponent: () => import('./features/badges/badges.component').then((m) => m.BadgesComponent),
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/reports.component').then((m) => m.ReportsComponent),
      },
      {
        path: 'publications',
        loadComponent: () => import('./features/publications/publications.component').then((m) => m.PublicationsComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/settings.component').then((m) => m.SettingsComponent),
      },
      {
        path: 'communities',
        loadComponent: () => import('./features/communities/communities.component').then((m) => m.CommunitiesComponent),
      },
      {
        path: 'contents',
        loadComponent: () => import('./features/contents/contents.component').then((m) => m.ContentsComponent),
      },
      // Redirection par défaut vers le dashboard pour les routes enfants
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  
  // Redirection des routes inconnues vers le dashboard
  { path: '**', redirectTo: 'dashboard' },
];