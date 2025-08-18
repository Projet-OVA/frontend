import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  pageTitle = 'Tableau de bord';
  stats = [
    { label: 'Badges', value: 42 },
    { label: 'Challenges', value: 17 },
    { label: 'Utilisateurs', value: 1200 },
  ];
}
