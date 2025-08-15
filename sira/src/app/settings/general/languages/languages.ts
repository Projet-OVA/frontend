import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-languages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './languages.html',
  styleUrls: ['./languages.scss']
})
export class Languages {
  pageTitle = 'Gestion des langues';

  languages = [
    { code: 'fr', name: 'Français', active: true },
    { code: 'en', name: 'Anglais', active: true },
    { code: 'es', name: 'Espagnol', active: false },
    { code: 'de', name: 'Allemand', active: false },
  ];

  toggleLanguage(lang: any) {
    lang.active = !lang.active;
  }
}
