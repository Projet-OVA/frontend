import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface User {
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  currentYear = new Date().getFullYear();
  showBreadcrumb = false;
  showUserDropdown = false;
  
  // Données date/heure
  currentDate: string = '';
  currentTime: string = '';
  private timeInterval: any;
  
  // Données utilisateur
  currentUser: User = {
    nom: 'Admin',
    prenom: 'SIRA',
    email: 'admin@sira.org',
    role: 'Administrateur'
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Charger la langue sauvegardée
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      this.translate.use(settings.language);
    }
    
    // Initialiser l'heure
    this.updateDateTime();
    this.timeInterval = setInterval(() => {
      this.updateDateTime();
    }, 1000);
    
    // Récupérer les infos utilisateur
    this.loadUserData();
  }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  private updateDateTime(): void {
    const now = new Date();
    
    // Format date : "Lundi 23 septembre 2024"
    this.currentDate = now.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Format heure : "14:30:25"
    this.currentTime = now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  private loadUserData(): void {
    // À adapter avec votre service d'authentification
    this.currentUser = this.auth.getCurrentUser();
  }

  // Méthodes utilisateur
  getUserFullName(): string {
    return `${this.currentUser.prenom} ${this.currentUser.nom}`;
  }

  getUserInitials(): string {
    return `${this.currentUser.prenom.charAt(0)}${this.currentUser.nom.charAt(0)}`.toUpperCase();
  }

  getUserRole(): string {
    return this.currentUser.role;
  }

  // Gestion dropdown utilisateur
  toggleUserDropdown(): void {
    this.showUserDropdown = !this.showUserDropdown;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}