import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-challenges',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './challenges.html',
  styleUrls: ['./challenges.scss']
})
export class ChallengesComponent implements OnInit {
  challenges: any[] = [];
  loading = false;
  error = '';
  showDialog = false;
  saving = false;

  // ✅ Nouveau : gestion détails
  showDetailsDialog = false;
  selectedChallenge: any = null;

  newChallenge: any = this.emptyChallenge();

  constructor(
    private api: ApiService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadChallenges();
  }

  /** Retourne un objet vide */
  emptyChallenge() {
    return {
      eventName: '',
      description: '',
      eventDate: '',
      location: '',
      organizerId: '',
      communityId: ''
    };
  }

  /** Charger les défis */
  loadChallenges() {
    this.loading = true;
    this.api.getEvents().subscribe({
      next: (data) => {
        this.challenges = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur chargement';
        this.loading = false;
      }
    });
  }

  /** Ouvrir la fenêtre de création/édition */
  openDialog(challenge?: any) {
    this.newChallenge = challenge ? { ...challenge } : this.emptyChallenge();
    this.showDialog = true;
  }

  /** Ouvrir popup de détails */
  openDetailsDialog(challenge: any) {
    this.selectedChallenge = challenge;
    this.showDetailsDialog = true;
  }

  /** Fermer popup détails */
  closeDetailsDialog() {
    this.showDetailsDialog = false;
    this.selectedChallenge = null;
  }

  /** Créer ou mettre à jour un défi */
  save() {
    if (!this.newChallenge.eventName) {
      alert('Nom du défi est obligatoire');
      return;
    }

    this.saving = true;

    // Si on édite
    if (this.newChallenge.id) {
      this.api.updateEvent(this.newChallenge.id, this.newChallenge).subscribe({
        next: () => {
          this.saving = false;
          this.showDialog = false;
          this.loadChallenges();
        },
        error: (err) => {
          console.error(err);
          alert('Erreur mise à jour');
          this.saving = false;
        }
      });
    } else {
      // Création
      const form = new FormData();
      form.append('eventName', this.newChallenge.eventName);
      form.append('description', this.newChallenge.description || '');
      form.append('eventDate', this.newChallenge.eventDate || '');
      form.append('location', this.newChallenge.location || '');
      form.append('organizerId', this.newChallenge.organizerId || '');
      form.append('communityId', this.newChallenge.communityId || '');

      this.api.createEvent(form).subscribe({
        next: () => {
          this.saving = false;
          this.showDialog = false;
          this.loadChallenges();
        },
        error: (err) => {
          console.error(err);
          alert('Erreur création');
          this.saving = false;
        }
      });
    }
  }

  /** Supprimer un défi */
  delete(challenge: any) {
    if (!confirm('Supprimer ce défi ?')) return;

    this.api.deleteEvent(challenge.id).subscribe({
      next: () => this.loadChallenges(),
      error: (err) => {
        console.error(err);
        alert('Erreur suppression');
      }
    });
  }
}
