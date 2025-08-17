import { Routes } from '@angular/router';

// Import des composants (à adapter si noms différents)
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';

// Badges
import { BadgesList } from './badges/badges-list/badges-list';
import { BadgesCreate } from './badges/badges-create/badges-create';
import { BadgesEdit } from './badges/badges-edit/badges-edit';

// Challenges
import { ChallengesList } from './contents/challenges/challenges-list/challenges-list';
import { ChallengesCreate } from './contents/challenges/challenges-create/challenges-create';
import { ChallengesEdit } from './contents/challenges/challenges-edit/challenges-edit';
import { Participations } from './contents/challenges/participations/participations';

// Educational
import { EducationalList } from './contents/educational/educational-list/educational-list';
import { EducationalCreate } from './contents/educational/educational-create/educational-create';
import { EducationalEdit } from './contents/educational/educational-edit/educational-edit';

// Podcasts
import { PodcastsList } from './podcasts/podcasts-list/podcasts-list';
import { PodcastValidate } from './podcasts/podcast-validate/podcast-validate';

// Settings
import { Languages } from './settings/general/languages/languages';
import { Translations } from './settings/general/translations/translations';
import { Notifications } from './settings/notifications/notifications';
import { Quotas } from './settings/quotas/quotas';

// Users
import { UsersList } from './users/users-list/users-list';
import { UserProfile } from './users/user-profile/user-profile';

// Dashboard secondaires
import { DashboardUsage } from './dashboard/dashboard-usage/dashboard-usage';
import { DashboardChallenges } from './dashboard/dashboard-challenges/dashboard-challenges';
import { DashboardBadges } from './dashboard/dashboard-badges/dashboard-badges';
import { DashboardFeedback } from './dashboard/dashboard-feedback/dashboard-feedback';

// Reports
import { ReportsExport } from './reports/reports-export/reports-export';

// Educational détail
import { EducationalDetail } from './contents/educational/educational-detail/educational-detail';

// Badge détail
import { BadgeDetail } from './badges/badge-detail/badge-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Pages principales
  { path: 'dashboard', component: Dashboard },
  { path: 'login', component: Login },

  // Badges
  { path: 'badges', component: BadgesList },
  { path: 'badges/create', component: BadgesCreate },
  { path: 'badges/edit/:id', component: BadgesEdit },

  // Challenges
  { path: 'challenges', component: ChallengesList },
  { path: 'challenges/create', component: ChallengesCreate },
  { path: 'challenges/edit/:id', component: ChallengesEdit },
  { path: 'participations', component: Participations },

  // Educational
  { path: 'educational', component: EducationalList },
  { path: 'educational/create', component: EducationalCreate },
  { path: 'educational/edit/:id', component: EducationalEdit },

  // Podcasts
  { path: 'podcasts', component: PodcastsList },
  { path: 'podcasts/validate/:id', component: PodcastValidate },

  // Settings
  { path: 'settings/languages', component: Languages },
  { path: 'settings/translations', component: Translations },
  { path: 'settings/notifications', component: Notifications },
  { path: 'settings/quotas', component: Quotas },

  // Users
  { path: 'users', component: UsersList },
  { path: 'users/profile/:id', component: UserProfile },

  // Wildcard route (pour une page 404 ou redirection)
  { path: '**', redirectTo: 'dashboard' }, 

    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Dashboard
  { path: 'dashboard', component: Dashboard },
  { path: 'dashboard/usage', component: DashboardUsage },
  { path: 'dashboard/challenges', component: DashboardChallenges },
  { path: 'dashboard/badges', component: DashboardBadges },
  { path: 'dashboard/feedback', component: DashboardFeedback },

  // Reports
  { path: 'reports/export', component: ReportsExport },

  // Educational
  { path: 'educational', component: EducationalList },
  { path: 'educational/create', component: EducationalCreate },
  { path: 'educational/edit/:id', component: EducationalEdit },
  { path: 'educational/:id', component: EducationalDetail },

  // Badges
  { path: 'badges', component: BadgesList },
  { path: 'badges/create', component: BadgesCreate },
  { path: 'badges/edit/:id', component: BadgesEdit },
  { path: 'badges/:id', component: BadgeDetail }
];
