import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-challenges-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './challenges-list.html',
  styleUrls: ['./challenges-list.scss']
})
export class ChallengesList {
  challenges = [
    { id: 1, title: 'Défi Énergie Verte', description: 'Réduire sa consommation énergétique pendant 7 jours.', status: 'En cours' },
    { id: 2, title: 'Marathon de Lecture', description: 'Lire 3 livres en un mois.', status: 'À venir' },
    { id: 3, title: 'Défi Sportif', description: '30 minutes de sport par jour pendant 15 jours.', status: 'Terminé' },
  ];

  deleteChallenge(id: number) {
    this.challenges = this.challenges.filter(c => c.id !== id);
  }
}
