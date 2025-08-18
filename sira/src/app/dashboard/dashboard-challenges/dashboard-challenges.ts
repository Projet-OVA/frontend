import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-challenges',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-challenges.html',
  styleUrls: ['./dashboard-challenges.scss']
})
export class DashboardChallenges {
  pageTitle = 'Défis récents';
  challenges = [
    { id: 1, name: 'Challenge Python', participants: 45 },
    { id: 2, name: 'Challenge Angular', participants: 30 },
    { id: 3, name: 'Challenge UX Design', participants: 18 },
  ];
}
