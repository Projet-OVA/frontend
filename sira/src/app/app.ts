import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'sira-admin';

  constructor(private translate: TranslateService) {
    // Définir la langue par défaut
    translate.setDefaultLang('fr');
    
    // Essayer de récupérer la langue sauvegardée
    const savedLang = localStorage.getItem('appSettings') 
      ? JSON.parse(localStorage.getItem('appSettings')!).language 
      : 'fr';
    
    translate.use(savedLang);
  }
}