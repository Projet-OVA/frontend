import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-participations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './participations.html',
  styleUrls: ['./participations.scss']
})
export class Participations implements OnInit {
  participations: any[] = [];

  ngOnInit(): void {
    // ⚡ Données fictives
    this.participations = [
      { id: 1, user: 'Alice', challenge: 'Défi React', date: '2025-08-10', status: 'Soumis' },
      { id: 2, user: 'Bob', challenge: 'Défi Angular', date: '2025-08-11', status: 'En cours' },
      { id: 3, user: 'Charlie', challenge: 'Défi Node.js', date: '2025-08-12', status: 'Validé' },
    ];
  }

  deleteParticipation(id: number) {
    this.participations = this.participations.filter(p => p.id !== id);
    console.log('Participation supprimée ✅', id);
  }
}
