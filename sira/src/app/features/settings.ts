import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { HttpClient } from '@angular/common/http';

interface Admin {
  id: string | null;
  nom: string;
  prenom: string;
  email: string;
  username: string;
  role: string;
  createdAt: string;
}

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
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

  appName = 'Sira Admin';

  // 🌍 gestion multilingue
  selected = 'fr';
  languages = ['fr', 'en', 'pt', 'es'];

  admins: Admin[] = [];
  logs: any[] = [];
  loading = false;
  saving = false;

  // pour CRUD admins
  showAdminDialog = false;
  theme = 'light';

  constructor(private http: HttpClient, private api: ApiService) {}

  ngOnInit() {
    this.loadAdmins();
  }

  // 🔹 Charger uniquement les admins
  loadAdmins() {
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

  saveSettings() {
    console.log('Sauvegarde paramètres', this.appName, this.theme, this.selected);
    // TODO: appeler une API backend pour sauvegarder les paramètres globaux
  }

  // 🔹 CRUD Admins
  openAdminDialog(admin?: Admin) {
    this.newAdmin = admin ? { ...admin } : {
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

  // settings.ts
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

    // Format des données probablement attendu par le backend
    const adminData = {
      nom: this.newAdmin.nom,
      prenom: this.newAdmin.prenom,
      email: this.newAdmin.email,
      // username: this.newAdmin.username,
      password: 'Password123!', // Ajout du mot de passe requis
      confirmPassword: 'Password123!', // Confirmation si nécessaire
    };

    // Ajoutez des logs pour déboguer
    console.log('Données envoyées:', adminData);
    console.log('Endpoint:', `${this.baseUrl}/auth/admin`);

    this.http.post(`${this.baseUrl}/auth/admin`, adminData).subscribe({
      next: (response: any) => {
        // Type explicit pour response
        console.log('Admin créé avec succès', response);
        this.saving = false;
        this.showAdminDialog = false;
        this.loadAdmins(); // Recharger la liste
        alert('Admin créé avec succès!');

        // Réinitialiser le formulaire
        this.newAdmin = { 
          id: null, 
          nom: '', 
          prenom: '', 
          email: '', 
          username: '',
          role: '',
          createdAt: ''
        };
      },
      error: (error: any) => {
        // Type explicit pour error
        console.error('Erreur détaillée création admin', error);
        this.saving = false;

        // Afficher le message d'erreur du backend si disponible
        if (error.error?.message) {
          if (Array.isArray(error.error.message)) {
            alert('Erreurs: ' + error.error.message.join(', '));
          } else {
            alert('Erreur: ' + error.error.message);
          }
        } else {
          alert("Erreur lors de la création de l'admin. Vérifiez la console pour plus de détails.");
        }
      },
    });
  }

  deleteAdmin(id: string | null) {
    if (!id || !confirm('Supprimer cet admin ?')) return;
    this.api.deleteUser(id).subscribe({
      next: () => this.loadAdmins(),
      error: (err: any) => console.error('Erreur suppression admin', err),
    });
  }
}