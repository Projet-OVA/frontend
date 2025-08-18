import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-feedback.html',
  styleUrls: ['./dashboard-feedback.scss']
})
export class DashboardFeedback {
  pageTitle = 'Derniers retours utilisateurs';
  feedbacks = [
    { user: 'Alice', comment: 'Super interface 👌' },
    { user: 'Karim', comment: 'J’aimerais plus de défis sur le backend.' },
    { user: 'Fatou', comment: 'Le système de badges est motivant 🚀' },
  ];
}
