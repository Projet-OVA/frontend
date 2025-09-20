import { Component, OnInit } from '@angular/core';
import { ApiService, Badge, DashboardData, UserProgress } from '../core/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-badges',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './badges.html',
  styleUrls: ['./badges.scss'],
})
export class BadgesComponent implements OnInit {
  dashboardData: DashboardData | null = null;
  badges: Badge[] = [];
  userProgress: UserProgress | null = null;
  loading = true;
  stats: { [key: string]: number } = {};

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadUserProgress();
    this.loadAllBadges();
    this.loadBadgeStats();
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

  loadBadgeStats(): void {
    this.apiService.getDashboardData().subscribe({
      next: (data) => {
        this.stats = data?.badgeStats?.badgeDistribution || {};
      },
      error: (err) => console.error('Erreur chargement stats', err),
    });
  }

  loadAllBadges(): void {
    this.apiService.getAllBadges().subscribe({
      next: (badges) => {
        this.badges = badges;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading badges:', error);
        // Fallback sur les données mockées
        this.badges = this.apiService.getMockBadges();
        this.loading = false;
      },
    });
  }

  //   getBadgeDistribution(): { key: string; count: number }[] {
  //   return Object.entries(this.stats).map(([key, count]) => ({ key, count as number }));
  // }

  // Méthode pour obtenir la distribution des badges
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
