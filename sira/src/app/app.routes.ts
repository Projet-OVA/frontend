import { Routes } from '@angular/router';

// Import des composants (à adapter si noms différents)
import { DashboardComponent } from './dashboard/dashboard';
import { LoginComponent } from './login/login';

// Badges
import { BadgesListComponent } from './badges/badges-list/badges-list';
import { BadgesCreateComponent } from './badges/badges-create/badges-create';
import { BadgesEditComponent } from './badges/badges-edit/badges-edit';

// Challenges
import { ChallengesListComponent } from './contents/challenges/challenges-list/challenges-list';
import { ChallengesCreateComponent } from './contents/challenges/challenges-create/challenges-create';
import { ChallengesEditComponent } from './contents/challenges/challenges-edit/challenges-edit';
import { ParticipationsComponent } from './contents/challenges/participations/participations';

// Educational
import { EducationalListComponent } from './contents/educational/educational-list/educational-list';
import { EducationalCreateComponent } from './contents/educational/educational-create/educational-create';
import { EducationalEditComponent } from './contents/educational/educational-edit/educational-edit';

// Podcasts
import { PodcastsListComponent } from './podcasts/podcasts-list/podcasts-list';
import { PodcastValidateComponent } from './podcasts/podcast-validate/podcast-validate';

// Settings
import { LanguagesComponent } from './settings/general/languages/languages';
import { TranslationsComponent } from './settings/general/translations/translations';
import { NotificationsComponent } from './settings/notifications/notifications';
import { QuotasComponent } from './settings/quotas/quotas';

// Users
import { UsersListComponent } from './users/users-list/users-list';
import { UserProfileComponent } from './users/user-profile/user-profile';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Pages principales
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },

  // Badges
  { path: 'badges', component: BadgesListComponent },
  { path: 'badges/create', component: BadgesCreateComponent },
  { path: 'badges/edit/:id', component: BadgesEditComponent },

  // Challenges
  { path: 'challenges', component: ChallengesListComponent },
  { path: 'challenges/create', component: ChallengesCreateComponent },
  { path: 'challenges/edit/:id', component: ChallengesEditComponent },
  { path: 'participations', component: ParticipationsComponent },

  // Educational
  { path: 'educational', component: EducationalListComponent },
  { path: 'educational/create', component: EducationalCreateComponent },
  { path: 'educational/edit/:id', component: EducationalEditComponent },

  // Podcasts
  { path: 'podcasts', component: PodcastsListComponent },
  { path: 'podcasts/validate/:id', component: PodcastValidateComponent },

  // Settings
  { path: 'settings/languages', component: LanguagesComponent },
  { path: 'settings/translations', component: TranslationsComponent },
  { path: 'settings/notifications', component: NotificationsComponent },
  { path: 'settings/quotas', component: QuotasComponent },

  // Users
  { path: 'users', component: UsersListComponent },
  { path: 'users/profile/:id', component: UserProfileComponent },

  // Wildcard route (pour une page 404 ou redirection)
  { path: '**', redirectTo: 'dashboard' }
];
