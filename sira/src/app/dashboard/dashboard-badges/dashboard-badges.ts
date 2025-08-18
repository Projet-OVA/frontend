import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-badges',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-badges.html',
  styleUrls: ['./dashboard-badges.scss']
})
export class DashboardBadges {
  pageTitle = 'Badges populaires';
  badges = [
    { id: 1, name: 'Débutant', awarded: 120 },
    { id: 2, name: 'Expert', awarded: 60 },
    { id: 3, name: 'Mentor', awarded: 15 },
  ];
}
