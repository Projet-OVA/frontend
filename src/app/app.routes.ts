import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';
import { AuthGuard } from './core/auth.guard';
import { CommunitiesComponent } from './features/communities';

export const routes: Routes = [
  // Redirection de la racine vers le login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Route pour le login (sans protection)
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then((m) => m.LoginComponent),
  },
  
  // Routes protégées avec le layout admin
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'courses',
        loadComponent: () => import('./features/courses').then((m) => m.CoursesComponent),
      },
      {
        path: 'challenges',
        loadComponent: () => import('./features/challenges').then((m) => m.ChallengesComponent),
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard').then((m) => m.DashboardComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('./features/users').then((m) => m.UsersComponent),
      },
      {
        path: 'contents',
        loadComponent: () => import('./features/contents').then((m) => m.ContentsComponent),
      },
      {
        path: 'badges',
        loadComponent: () => import('./features/badges').then((m) => m.BadgesComponent),
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports').then((m) => m.ReportsComponent),
      },
      {
        path: 'publications',
        loadComponent: () =>
          import('./features/publications/publications').then((m) => m.PublicationsComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings').then((m) => m.SettingsComponent),
      },
      { 
        path: 'communities', 
        component: CommunitiesComponent 
      },
      // Redirection par défaut vers le dashboard pour les routes enfants
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  
  // Redirection des routes inconnues vers le login
  { path: '**', redirectTo: 'login' },
];