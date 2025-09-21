import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, DashboardData, UserProgress } from '../core/api.service';
import Chart from 'chart.js/auto';
import { Subscription } from 'rxjs';

// Ajoutez cette interface pour les statistiques animées
interface AnimatedStats {
  totalUsers: number;
  activeUsers: number;
  totalEvents: number;
  totalBadges: number;
  [key: string]: number; // Index signature pour résoudre l'erreur TS7053
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  dashboardData: DashboardData | null = null;
  userProgress: UserProgress | null = null;
  loading = true;
  error: string | null = null;

  // Charts
  private badgeChart: any;
  private userGrowthChart: any;
  private engagementChart: any;

  // Animations - utilisez l'interface AnimatedStats
  animatedStats: AnimatedStats = {
    totalUsers: 0,
    activeUsers: 0,
    totalEvents: 0,
    totalBadges: 0,
  };

  private subscriptions: Subscription[] = [];

  constructor(private apiService: ApiService) {}

  parseFloat = parseFloat;
  ngOnInit(): void {
    this.loadDashboardData();
    this.loadUserProgress();
  }

  ngAfterViewInit(): void {
    // Initialiser les charts après le rendu initial
    setTimeout(() => {
      if (this.dashboardData) {
        this.createCharts();
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    // Nettoyer les subscriptions et charts
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    if (this.badgeChart) this.badgeChart.destroy();
    if (this.userGrowthChart) this.userGrowthChart.destroy();
    if (this.engagementChart) this.engagementChart.destroy();
  }

  loadDashboardData(): void {
    const sub = this.apiService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.loading = false;
        this.animateStatistics();
        setTimeout(() => this.createCharts(), 300);
      },
      error: (error) => {
        console.error('Error loading dashboard:', error);
        this.dashboardData = this.apiService.getMockDashboardData();
        this.loading = false;
        this.animateStatistics();
        setTimeout(() => this.createCharts(), 300);
      },
    });
    this.subscriptions.push(sub);
  }

  loadUserProgress(): void {
    const sub = this.apiService.getUserProgress().subscribe({
      next: (progress) => {
        this.userProgress = progress;
      },
      error: (error) => {
        console.error('Error loading progress:', error);
        this.userProgress = this.apiService.getMockUserProgress();
      },
    });
    this.subscriptions.push(sub);
  }

  private animateStatistics(): void {
    if (!this.dashboardData) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const statsToAnimate = [
      {
        target: this.dashboardData.userStats.totalUsers,
        current: this.animatedStats.totalUsers,
        key: 'totalUsers',
      },
      {
        target: this.dashboardData.userStats.activeUsers,
        current: this.animatedStats.activeUsers,
        key: 'activeUsers',
      },
      {
        target: this.dashboardData.eventStats.totalEvents,
        current: this.animatedStats.totalEvents,
        key: 'totalEvents',
      },
      {
        target: this.dashboardData.badgeStats.totalBadges,
        current: this.animatedStats.totalBadges,
        key: 'totalBadges',
      },
    ];

    statsToAnimate.forEach((stat) => {
      const stepValue = (stat.target - stat.current) / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        this.animatedStats[stat.key] = Math.round(stat.current + stepValue * currentStep);

        if (currentStep >= steps) {
          this.animatedStats[stat.key] = stat.target;
          clearInterval(timer);
        }
      }, interval);
    });
  }

  private createCharts(): void {
    this.createBadgeDistributionChart();
    this.createUserGrowthChart();
    this.createEngagementChart();
  }

  private createBadgeDistributionChart(): void {
    const ctx = document.getElementById('badgeChart') as HTMLCanvasElement;
    if (!ctx || !this.dashboardData?.badgeStats?.badgeDistribution) return;

    const distribution = this.dashboardData.badgeStats.badgeDistribution;
    const labels = Object.keys(distribution);
    const data = Object.values(distribution);

    this.badgeChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              'rgba(239, 68, 68, 0.8)',
              'rgba(31, 41, 55, 0.8)',
              'rgba(249, 115, 22, 0.8)',
              'rgba(107, 114, 128, 0.8)',
              'rgba(16, 185, 129, 0.8)',
            ],
            borderColor: [
              'rgb(239, 68, 68)',
              'rgb(31, 41, 55)',
              'rgb(249, 115, 22)',
              'rgb(107, 114, 128)',
              'rgb(16, 185, 129)',
            ],
            borderWidth: 2,
            hoverOffset: 12,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#6b7280',
              font: {
                size: 12,
                family: 'Inter',
              },
              padding: 20,
            },
          },
          tooltip: {
            backgroundColor: 'rgba(31, 41, 55, 0.95)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#374151',
            borderWidth: 1,
            cornerRadius: 8,
          },
        },
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 2000,
          easing: 'easeOutQuart',
        },
      },
    });
  }

  private createUserGrowthChart(): void {
    const ctx = document.getElementById('userGrowthChart') as HTMLCanvasElement;
    if (!ctx) return;

    // Données simulées pour la croissance (à remplacer par des données réelles)
    const months = [
      'Jan',
      'Fév',
      'Mar',
      'Avr',
      'Mai',
      'Jun',
      'Jul',
      'Aoû',
      'Sep',
      'Oct',
      'Nov',
      'Déc',
    ];
    const userData = [120, 145, 180, 210, 250, 300, 350, 400, 450, 500, 550, 600];
    const activeData = [80, 100, 130, 160, 200, 240, 280, 320, 360, 400, 440, 480];

    this.userGrowthChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Utilisateurs totaux',
            data: userData,
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: 'rgb(239, 68, 68)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
          {
            label: 'Utilisateurs actifs',
            data: activeData,
            borderColor: 'rgb(31, 41, 55)',
            backgroundColor: 'rgba(31, 41, 55, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: 'rgb(31, 41, 55)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#6b7280',
              font: {
                family: 'Inter',
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            },
            ticks: {
              color: '#6b7280',
            },
          },
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            },
            ticks: {
              color: '#6b7280',
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
      },
    });
  }

  private createEngagementChart(): void {
    const ctx = document.getElementById('engagementChart') as HTMLCanvasElement;
    if (!ctx) return;

    // Données simulées pour l'engagement
    const engagementData = [65, 70, 75, 80, 78, 82, 85, 88, 90, 92, 95, 97];

    this.engagementChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Jan',
          'Fév',
          'Mar',
          'Avr',
          'Mai',
          'Jun',
          'Jul',
          'Aoû',
          'Sep',
          'Oct',
          'Nov',
          'Déc',
        ],
        datasets: [
          {
            label: "Taux d'engagement (%)",
            data: engagementData,
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 2,
            borderRadius: 6,
            hoverBackgroundColor: 'rgba(16, 185, 129, 1)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            },
            ticks: {
              color: '#6b7280',
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#6b7280',
            },
          },
        },
      },
    });
  }

  getProgressColor(percentage: number): string {
    if (percentage >= 80) return '#10b981';
    if (percentage >= 50) return '#f59e0b';
    return '#ef4444';
  }

  formatPercentage(value: string): string {
    return `${parseFloat(value).toFixed(1)}%`;
  }

  getChangeIcon(change: string): string {
    if (change.includes('+')) return '↗';
    if (change.includes('-')) return '↘';
    return '→';
  }

  getChangeColor(change: string): string {
    if (change.includes('+')) return '#10b981';
    if (change.includes('-')) return '#ef4444';
    return '#6b7280';
  }

  getTotalQuizzes(): number {
    if (!this.userProgress?.data?.categories) return 0;
    return this.userProgress.data.categories.reduce(
      (total, category) => total + category.totalQuizzes,
      0
    );
  }

  getCompletedQuizzes(): number {
    if (!this.userProgress?.data?.categories) return 0;
    return this.userProgress.data.categories.reduce(
      (total, category) => total + category.completedQuizzes,
      0
    );
  }
}
