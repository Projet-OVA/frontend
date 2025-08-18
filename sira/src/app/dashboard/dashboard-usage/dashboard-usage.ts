import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-usage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-usage.html',
  styleUrls: ['./dashboard-usage.scss']
})
export class DashboardUsage {
  pageTitle = 'Statistiques d’utilisation';
  usageStats = [
    { label: 'Connexions actives', value: 320 },
    { label: 'Cours terminés', value: 150 },
    { label: 'Défis complétés', value: 90 },
  ];
}
