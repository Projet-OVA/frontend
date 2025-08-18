import { Routes } from '@angular/router';
import { UsersList } from './users-list/users-list';
import { UserProfile } from './user-profile/user-profile';

export const usersRoutes: Routes = [
  {
    path: '',
    component: UsersList
  },
  {
    path: ':id',
    component: UserProfile
  }
];
