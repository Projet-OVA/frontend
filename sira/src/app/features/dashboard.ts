import { Component, OnInit } from '@angular/core';
import { ApiService, DashboardData, UserProgress } from '../core/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {
  // Assurez-vous d'avoir ces propriétés :
  dashboardData: DashboardData | null = null;
  userProgress: UserProgress | null = null;
  loading = true;
  error: string | null = null;
  parseFloat = parseFloat;

  badgeChartData: Array<{
    key: string;
    count: number;
    percentage: number;
    color: string;
    strokeDasharray: string;
    strokeDashoffset: number;
  }> = [];

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
      },
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
      },
    });
  }

  // Méthode pour calculer les pourcentages des badges
  getBadgeDistributionWithPercentages(): Array<{
    key: string;
    count: number;
    percentage: number;
    color: string;
  }> {
    if (!this.dashboardData?.badgeStats?.badgeDistribution) {
      return [];
    }

    const distribution = Object.entries(this.dashboardData.badgeStats.badgeDistribution);
    const total = distribution.reduce((sum, [_, count]) => sum + count, 0);

    const colors = ['#ef4444', '#1f2937', '#f97316', '#6b7280']; // Rouge, Noir, Orange, Gris

    return distribution.map(([key, count], index) => ({
      key,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
      color: colors[index % colors.length],
    }));
  }

  // Méthode pour calculer le stroke-dasharray pour SVG
  calculateStrokeDasharray(percentage: number): string {
    const circumference = 2 * Math.PI * 80; // rayon de 80
    const dashLength = (percentage / 100) * circumference;
    return `${dashLength.toFixed(2)} ${circumference.toFixed(2)}`;
  }

  // Méthode pour calculer l'offset cumulatif
  calculateStrokeDashoffset(previousPercentages: number[]): number {
    const circumference = 2 * Math.PI * 80;
    const totalPreviousPercentage = previousPercentages.reduce((sum, p) => sum + p, 0);
    return -(totalPreviousPercentage / 100) * circumference;
  }

  // *****************
  // *****************

  prepareBadgeChartData(): void {
    if (!this.dashboardData?.badgeStats?.badgeDistribution) {
      this.badgeChartData = [];
      return;
    }

    const distribution = Object.entries(this.dashboardData.badgeStats.badgeDistribution);
    const total = distribution.reduce((sum, [_, count]) => sum + count, 0);
    const colors = ['#ef4444', '#1f2937', '#f97316', '#6b7280']; // Rouge, Noir, Orange, Gris
    const circumference = 2 * Math.PI * 80; // rayon de 80

    let cumulativePercentage = 0;

    this.badgeChartData = distribution.map(([key, count], index) => {
      const percentage = total > 0 ? (count / total) * 100 : 0;
      const dashLength = (percentage / 100) * circumference;
      const strokeDasharray = `${dashLength.toFixed(2)} ${circumference.toFixed(2)}`;
      const strokeDashoffset = -(cumulativePercentage / 100) * circumference;

      const result = {
        key,
        count,
        percentage,
        color: colors[index % colors.length],
        strokeDasharray,
        strokeDashoffset: index === 0 ? 0 : strokeDashoffset,
      };

      cumulativePercentage += percentage;
      return result;
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

  // Méthode pour obtenir le total des badges
  getTotalBadges(): number {
    if (!this.dashboardData?.badgeStats?.badgeDistribution) {
      return 0;
    }

    return Object.values(this.dashboardData.badgeStats.badgeDistribution).reduce(
      (sum, count) => sum + count,
      0
    );
  }

  // Méthode de tracking pour optimiser les performances d'Angular
  trackByIndex(index: number, item: any): number {
    return index;
  }

  // Méthode pour obtenir la distribution des badges (ancienne méthode conservée)
  getBadgeDistribution(): { key: string; count: number }[] {
    if (!this.dashboardData?.badgeStats?.badgeDistribution) {
      return [];
    }
    return Object.entries(this.dashboardData.badgeStats.badgeDistribution).map(([key, count]) => ({
      key,
      count,
    }));
  }
}
