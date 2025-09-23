// src/app/features/dashboard.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { ApiService } from '../core/api.service';
import { catchError, of, finalize } from 'rxjs';

Chart.register(...registerables);

interface DashboardResponseDto {
  userStats: { totalUsers: number; activeUsers: number };
  eventStats: { totalEvents: number };
  badgeStats: { totalBadges: number; badgeDistribution: { [key: string]: number } };
  courseProgress: {
    completionRate: string;
    completionRateChange: string;
    averageTime: string;
    averageTimeChange: string;
  };
  communityEngagement: { engagementRate: string; engagementRateChange: string };
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {
  loading = true;
  error: string | null = null;
  dashboard: DashboardResponseDto | null = null;
  refreshing = false;

  // Charts data
  badgesPieLabels: string[] = [];
  badgesPieData: number[] = [];
  progressDoughnutData: number[] = [0, 100];

  // Chart options
  pieOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          color: '#000'
        }
      }
    }
  };

  doughnutOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        display: false
      }
    }
  };

  // Données réelles
  totalUsers = 0;
  activeUsers = 0;
  totalEvents = 0;
  totalBadges = 0;
  engagementRate = '0%';
  completionRate = '0%';
  lastRefresh = new Date().toLocaleString();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getDashboard().pipe(
      catchError((error) => {
        this.error = 'Erreur lors du chargement des données';
        console.error('Dashboard error:', error);
        return of(null);
      }),
      finalize(() => {
        this.loading = false;
        this.refreshing = false;
      })
    ).subscribe((data: DashboardResponseDto | null) => {
      if (data) {
        this.dashboard = data;
        this.updateMetrics(data);
        this.updateCharts(data);
        this.lastRefresh = new Date().toLocaleString();
      }
    });
  }

  private updateMetrics(data: DashboardResponseDto): void {
    this.totalUsers = data.userStats.totalUsers;
    this.activeUsers = data.userStats.activeUsers;
    this.totalEvents = data.eventStats.totalEvents;
    this.totalBadges = data.badgeStats.totalBadges;
    this.engagementRate = data.communityEngagement.engagementRate;
    this.completionRate = data.courseProgress.completionRate;
  }

  private updateCharts(data: DashboardResponseDto): void {
    // Badges distribution
    this.badgesPieLabels = Object.keys(data.badgeStats.badgeDistribution);
    this.badgesPieData = Object.values(data.badgeStats.badgeDistribution);

    // Progress doughnut
    const completionValue = parseInt(this.completionRate.replace('%', ''), 10) || 0;
    this.progressDoughnutData = [completionValue, 100 - completionValue];
  }

  loadCategoryProgress(category: 'ENVIRONNEMENT' | 'DROIT_DU_CITOYEN' | 'DEVOIR_DU_CITOYEN'): void {
    this.apiService.getCategoryProgress(category).pipe(
      catchError((error) => {
        console.error('Category progress error:', error);
        return of(null);
      })
    ).subscribe((response: any) => {
      if (response?.data?.progressPercentage) {
        const progress = response.data.progressPercentage;
        this.progressDoughnutData = [progress, 100 - progress];
      }
    });
  }

  refresh(): void {
    this.refreshing = true;
    this.loadDashboard();
  }
}