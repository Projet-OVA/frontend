import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

interface Admin {
  id: string | null;
  nom: string;
  prenom: string;
  email: string;
  username: string;
  role: string;
  createdAt: string;
}

interface AppSettings {
  language: string;
  appName: string;
}

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule, TranslateModule, HttpClientModule],
  standalone: true,
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
})
export class SettingsComponent implements OnInit {
  private baseUrl = 'https://sira-backendv1.onrender.com/api';

  newAdmin: Admin = {
    id: null,
    nom: '',
    prenom: '',
    email: '',
    username: '',
    role: '',
    createdAt: '',
  };

  userRole: string = '';

  appSettings: AppSettings = {
    language: 'fr',
    appName: 'Sira Admin',
  };

  languages = [
    { code: 'fr', name: 'LANGUAGES.FR', flag: '🇫🇷' },
    { code: 'en', name: 'LANGUAGES.EN', flag: '🇺🇸' },
    { code: 'pt', name: 'LANGUAGES.PT', flag: '🇵🇹' },
    { code: 'es', name: 'LANGUAGES.ES', flag: '🇪🇸' },
  ];

  admins: Admin[] = [];
  logs: any[] = [];
  loading = false;
  saving = false;
  showAdminDialog = false;

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private auth: AuthService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadSettings();
    this.userRole = (this.auth.getUserRole() || '').toUpperCase();
    console.log('Role courant:', this.userRole);

    // Seuls les SUPER_ADMIN peuvent gérer les autres admins
    if (this.userRole === 'SUPERADMIN') {
      this.loadAdmins();
    }
  }

  loadSettings() {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      this.appSettings = { ...this.appSettings, ...JSON.parse(savedSettings) };
    }
  }

  saveSettings() {
    localStorage.setItem('appSettings', JSON.stringify(this.appSettings));
    alert('Paramètres sauvegardés avec succès!');
  }

  loadAdmins() {
    if (this.userRole !== 'SUPERADMIN') {
      console.log('Accès refusé: seuls les SUPER_ADMIN peuvent voir les admins');
      return;
    }

    this.loading = true;
    this.api.getUsers().subscribe({
      next: (res: any) => {
        this.admins = res.filter((u: Admin) => u.role === 'ADMIN');
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erreur chargement admins', err);
        this.loading = false;
      },
    });
  }

  openAdminDialog(admin?: Admin) {
    this.newAdmin = admin
      ? { ...admin }
      : {
          id: null,
          nom: '',
          prenom: '',
          email: '',
          username: '',
          role: '',
          createdAt: '',
        };
    this.showAdminDialog = true;
  }

  // Dans settings.ts
  saveAdmin() {
    if (
      !this.newAdmin.nom ||
      !this.newAdmin.prenom ||
      !this.newAdmin.email ||
      !this.newAdmin.username
    ) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    this.saving = true;
    const adminData = {
      nom: this.newAdmin.nom,
      prenom: this.newAdmin.prenom,
      email: this.newAdmin.email,
      username: this.newAdmin.username,
      password: 'Password123!',
      confirmPassword: 'Password123!',
    };

    // Utilisez votre ApiService qui gère déjà l'authentification
    this.api.createAdmin(adminData).subscribe({
      next: (response: any) => {
        console.log('Admin créé avec succès', response);
        this.saving = false;
        this.showAdminDialog = false;
        this.loadAdmins();
        alert('Admin créé avec succès!');
        this.resetNewAdmin();
      },
      error: (error: any) => {
        console.error('Erreur création admin', error);
        this.saving = false;

        if (error.status === 401) {
          alert("Erreur d'authentification. Veuillez vous reconnecter.");
          this.auth.logout();
        } else if (error.error?.message) {
          alert('Erreur: ' + error.error.message);
        } else {
          alert("Erreur lors de la création de l'admin.");
        }
      },
    });
  }

  private resetNewAdmin() {
    this.newAdmin = {
      id: null,
      nom: '',
      prenom: '',
      email: '',
      username: '',
      role: '',
      createdAt: '',
    };
  }

  deleteAdmin(id: string | null) {
    if (!id || !confirm('Supprimer cet admin ?')) return;
    this.api.deleteUser(id).subscribe({
      next: () => this.loadAdmins(),
      error: (err: any) => console.error('Erreur suppression admin', err),
    });
  }

  onLanguageChange() {
    this.translate.use(this.appSettings.language);
    localStorage.setItem('appSettings', JSON.stringify(this.appSettings));
  }
}
