import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-challenges',
  imports: [CommonModule, FormsModule],
  templateUrl: './challenges.html',
  styleUrls: ['./challenges.scss'],
})
export class ChallengesComponent implements OnInit {
  challenges: any[] = [];
  loading = false;
  error = '';
  showDialog = false;
  saving = false;
  filterStatus = '';

  newChallenge: any = {
    title: '',
    description: '',
    communityId: '',
    status: 'DRAFT',
    startDate: '',
    endDate: '',
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadChallenges();
  }

  loadChallenges() {
    this.loading = true;
    this.api.getEvents().subscribe({
      next: (data) => {
        this.challenges = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur chargement';
        this.loading = false;
      },
    });
  }

  openDialog(challenge?: any) {
    this.newChallenge = challenge
      ? { ...challenge }
      : {
          title: '',
          description: '',
          communityId: '',
          status: 'DRAFT',
          startDate: '',
          endDate: '',
        };
    this.showDialog = true;
  }

  save() {
    if (!this.newChallenge.title) {
      alert('Titre est obligatoire');
      return;
    }

    this.saving = true;
    const form = new FormData();
    form.append('title', this.newChallenge.title);
    form.append('description', this.newChallenge.description || '');
    form.append('communityId', this.newChallenge.communityId || '');
    form.append('status', this.newChallenge.status);
    form.append('startDate', this.newChallenge.startDate || '');
    form.append('endDate', this.newChallenge.endDate || '');

    const obs = this.newChallenge.id
      ? this.api.updateEvent(this.newChallenge.id, form)
      : this.api.createEvent(form);

    obs.subscribe({
      next: () => {
        this.saving = false;
        this.showDialog = false;
        this.loadChallenges();
      },
      error: (err) => {
        console.error(err);
        this.saving = false;
        alert('Erreur: ' + (err.error?.message || 'Erreur sauvegarde'));
      },
    });
  }

  delete(challenge: any) {
    if (!confirm('Supprimer ce défi ?')) return;
    this.api.deleteEvent(challenge.id).subscribe({
      next: () => this.loadChallenges(),
      error: () => alert('Erreur suppression'),
    });
  }

  publish(challenge: any) {
    const form = new FormData();
    form.append('status', 'PUBLISHED');
    this.api.updateEvent(challenge.id, form).subscribe({
      next: () => this.loadChallenges(),
      error: () => alert('Erreur publication'),
    });
  }
}
