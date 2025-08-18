import { Routes } from '@angular/router';
import { EducationalList } from './educational-list/educational-list';
import { EducationalDetail } from './educational-detail/educational-detail';
import { EducationalCreate } from './educational-create/educational-create';
import { EducationalEdit } from './educational-edit/educational-edit';

export const educationalRoutes: Routes = [
  {
    path: '',
    component: EducationalList,   // /educational
  },
  {
    path: 'create',
    component: EducationalCreate, // /educational/create
  },
  {
    path: 'edit/:id',
    component: EducationalEdit,   // /educational/edit/:id
  },
  {
    path: ':id',
    component: EducationalDetail, // /educational/:id
  }
];
