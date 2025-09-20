import { Component, OnInit } from '@angular/core';
import { ApiService, DashboardData, UserProgress } from '../core/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  // Assurez-vous d'avoir ces propriétés :
  dashboardData: DashboardData | null = null;
  userProgress: UserProgress | null = null;
  loading = true;
  error: string | null = null;
  parseFloat = parseFloat;

  // Supprimez cette propriété si elle existe :
  // stats: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadUserProgress();
  }

  loadDashboardData(): void {
    this.apiService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard:', error);
        this.dashboardData = this.apiService.getMockDashboardData();
        this.loading = false;
      }
    });
  }

  loadUserProgress(): void {
    this.apiService.getUserProgress().subscribe({
      next: (progress) => {
        this.userProgress = progress;
      },
      error: (error) => {
        console.error('Error loading progress:', error);
        this.userProgress = this.apiService.getMockUserProgress();
      }
    });
  }

  // Méthodes utilitaires pour le template
  getProgressColor(percentage: number): string {
    if (percentage >= 80) return '#10b981';
    if (percentage >= 50) return '#f59e0b';
    return '#ef4444';
  }

  formatPercentage(value: string): string {
    return `${parseFloat(value).toFixed(1)}%`;
  }

  // Méthode pour obtenir la distribution des badges
  getBadgeDistribution(): { key: string; count: number }[] {
    if (!this.dashboardData?.badgeStats?.badgeDistribution) {
      return [];
    }
    
    return Object.entries(this.dashboardData.badgeStats.badgeDistribution).map(
      ([key, count]) => ({ key, count })
    );
  }
}