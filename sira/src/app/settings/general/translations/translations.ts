import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-translations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './translations.html',
  styleUrls: ['./translations.scss']
})
export class Translations {
  pageTitle = 'Gestion des traductions';

  translations = [
    { key: 'dashboard.title', fr: 'Tableau de bord', en: 'Dashboard' },
    { key: 'login.button', fr: 'Se connecter', en: 'Login' },
    { key: 'logout.button', fr: 'Se déconnecter', en: 'Logout' },
  ];
}
