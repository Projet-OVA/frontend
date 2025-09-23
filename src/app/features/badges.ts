import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, DashboardData } from '../core/api.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-badges',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './badges.html',
  styleUrls: ['./badges.scss'],
})
export class BadgesComponent implements OnInit, OnDestroy {
  dashboardData: DashboardData | null = null;
  loading = true;
  error: string | null = null;
  
  // Stats
  totalBadges = 0;
  totalUsersWithBadges = 0;
  averageBadgesPerUser = 0;
  topBadges: { key: string; count: number }[] = [];

  // Charts
  private distributionChart: any;
  private progressChart: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    // Cleanup charts
    if (this.distributionChart) this.distributionChart.destroy();
    if (this.progressChart) this.progressChart.destroy();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.calculateStats();
        this.loading = false;
        setTimeout(() => this.createCharts(), 100);
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.error = 'Impossible de charger les statistiques';
        this.loading = false;
        // Fallback to mock data
        this.dashboardData = this.apiService.getMockDashboardData();
        this.calculateStats();
      },
    });
  }

  private calculateStats(): void {
    if (!this.dashboardData?.badgeStats) return;

    const distribution = this.dashboardData.badgeStats.badgeDistribution || {};
    
    // Calculate totals
    this.totalBadges = this.dashboardData.badgeStats.totalBadges || 0;
    this.totalUsersWithBadges = this.dashboardData.userStats?.activeUsers || 0;
    this.averageBadgesPerUser = this.totalUsersWithBadges > 0 
      ? this.totalBadges / this.totalUsersWithBadges 
      : 0;

    // Get top 5 badges
    this.topBadges = Object.entries(distribution)
      .map(([key, count]) => ({ key, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  private createCharts(): void {
    this.createDistributionChart();
    this.createProgressChart();
  }

  private createDistributionChart(): void {
    const ctx = document.getElementById('distributionChart') as HTMLCanvasElement;
    if (!ctx || !this.dashboardData?.badgeStats?.badgeDistribution) return;

    const distribution = this.dashboardData.badgeStats.badgeDistribution;
    const labels = Object.keys(distribution);
    const data = Object.values(distribution);

    this.distributionChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Nombre d\'attributions',
          data: data,
          backgroundColor: [
            'rgba(239, 68, 68, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(249, 115, 22, 0.8)',
            'rgba(139, 92, 246, 0.8)'
          ],
          borderColor: [
            'rgb(239, 68, 68)',
            'rgb(34, 197, 94)',
            'rgb(59, 130, 246)',
            'rgb(249, 115, 22)',
            'rgb(139, 92, 246)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Nombre d\'attributions'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Types de badges'
            }
          }
        }
      }
    });
  }

  private createProgressChart(): void {
    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;
    if (!ctx) return;

    // Données simulées pour la progression mensuelle
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'];
    const monthlyData = [120, 150, 180, 210, 240, 275];

    this.progressChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Attributions mensuelles',
          data: monthlyData,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Nombre d\'attributions'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Mois'
            }
          }
        }
      }
    });
  }
}