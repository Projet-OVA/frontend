import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
})
export class SettingsComponent {
  appName = 'Sira Admin';

  selected = 'fr'; // ← Ajouter
  languages = ['fr', 'en']; // ← Ajouter
  admins: any[] = []; // ← Ajouter
  logs: any[] = []; // ← Ajouter

  constructor() {
    // Données d'exemple
    this.admins = [{ id: 1, name: 'Admin Principal', email: 'admin@ova.org' }];
    this.logs = [{ action: 'Connexion', at: new Date(), ip: '192.168.1.1' }];
  }

  theme = 'light';

  saveSettings() {
    // TODO: appeler API Nest pour sauvegarder les paramètres
    console.log('Sauvegarde paramètres', this.appName, this.theme);
  }

  editAdmin(id: number) {} // ← Ajouter
  deleteAdmin(id: number) {} // ← Ajouter

}


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ApiService } from '../core/api.service';

// @Component({
//   selector: 'app-settings',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './settings.html',
//   styleUrls: ['./settings.scss']
// })
// export class SettingsComponent implements OnInit {
//   settings: any = {};

//   constructor(private api: ApiService) {}

//   ngOnInit() {
//     this.loadSettings();
//   }

//   loadSettings() {
//     // TODO: Remplacer 'settings' par ton endpoint Nest
//     this.api.get<any>('settings').subscribe(data => {
//       this.settings = data;
//     });
//   }

//   save() {
//     // TODO: POST/PUT vers ton endpoint Nest
//     this.api.put('settings', this.settings).subscribe(() => {
//       alert('Paramètres sauvegardés !');
//     });
//   }
// }
