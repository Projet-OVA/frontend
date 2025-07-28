import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'parcours',
    loadChildren: () =>
      import('./features/parcours/parcours.module').then(m => m.ParcoursModule)
  },
  {
    path: 'recits',
    loadChildren: () =>
      import('./features/recits/recits.module').then(m => m.RecitsModule)
  },
  {
    path: 'defis',
    loadChildren: () =>
      import('./features/defis/defis.module').then(m => m.DefisModule)
  },
  {
    path: 'quiz',
    loadChildren: () =>
      import('./features/quiz/quiz.module').then(m => m.QuizModule)
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./features/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
