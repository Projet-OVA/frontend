// src/app/features/dashboard.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

interface CategoryProgress {
  id: string;
  category: string;
  completedQuizzes: number;
  totalQuizzes: number;
  progressPercentage: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('envChart') envChartRef!: ElementRef;
  @ViewChild('droitChart') droitChartRef!: ElementRef;
  @ViewChild('devoirChart') devoirChartRef!: ElementRef;

  activeCategory: string = 'GLOBAL';
  loading = true;
  error: string | null = null;
  dashboard: DashboardResponseDto | null = null;
  refreshing = false;

  // Données de progression par catégorie
  categoryProgress: { [key: string]: CategoryProgress } = {
    'ENVIRONNEMENT': { 
      id: '', category: 'ENVIRONNEMENT', completedQuizzes: 0, totalQuizzes: 0, 
      progressPercentage: 0, isCompleted: false, createdAt: '', updatedAt: '' 
    },
    'DROIT_DU_CITOYEN': { 
      id: '', category: 'DROIT_DU_CITOYEN', completedQuizzes: 0, totalQuizzes: 0, 
      progressPercentage: 0, isCompleted: false, createdAt: '', updatedAt: '' 
    },
    'DEVOIR_DU_CITOYEN': { 
      id: '', category: 'DEVOIR_DU_CITOYEN', completedQuizzes: 0, totalQuizzes: 0, 
      progressPercentage: 0, isCompleted: false, createdAt: '', updatedAt: '' 
    }
  };

  // Charts data
  badgesPieLabels: string[] = [];
  badgesPieData: number[] = [];

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
          color: '#000',
        },
      },
    },
  };

  // Données réelles
  totalUsers = 0;
  activeUsers = 0;
  totalEvents = 0;
  totalBadges = 0;
  engagementRate = '0%';
  completionRate = '0%';
  lastRefresh = new Date().toLocaleString();

  // Charts instances
  private envChart: any;
  private droitChart: any;
  private devoirChart: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadDashboard();
    this.loadAllCategoryProgress();
  }

  loadDashboard(): void {
    this.loading = true;
    this.error = null;

    this.apiService
      .getDashboard()
      .pipe(
        catchError((error) => {
          this.error = 'Erreur lors du chargement des données';
          console.error('Dashboard error:', error);
          return of(null);
        }),
        finalize(() => {
          this.loading = false;
          this.refreshing = false;
        })
      )
      .subscribe((data: DashboardResponseDto | null) => {
        if (data) {
          this.dashboard = data;
          this.updateMetrics(data);
          this.updateCharts(data);
          this.lastRefresh = new Date().toLocaleString();
        }
      });
  }

  loadAllCategoryProgress(): void {
    const categories = ['ENVIRONNEMENT', 'DROIT_DU_CITOYEN', 'DEVOIR_DU_CITOYEN'];
    
    categories.forEach(category => {
      this.apiService.getCategoryProgress(category as any).pipe(
        catchError((error) => {
          console.error(`Error loading ${category} progress:`, error);
          return of(null);
        })
      ).subscribe((response: any) => {
        if (response?.data) {
          this.categoryProgress[category] = response.data;
          this.updateCategoryChart(category);
        }
      });
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
  }

  private updateCategoryChart(category: string): void {
    setTimeout(() => {
      switch(category) {
        case 'ENVIRONNEMENT':
          this.createEnvironmentChart();
          break;
        case 'DROIT_DU_CITOYEN':
          this.createDroitChart();
          break;
        case 'DEVOIR_DU_CITOYEN':
          this.createDevoirChart();
          break;
      }
    }, 100);
  }

  // DIAGRAMME ENVIRONNEMENT - Circulaire style nature
  private createEnvironmentChart(): void {
    if (this.envChart) {
      this.envChart.destroy();
    }

    const progress = this.categoryProgress['ENVIRONNEMENT'];
    const ctx = this.envChartRef.nativeElement.getContext('2d');
    
    this.envChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Complétés', 'Restants'],
        datasets: [{
          data: [progress.completedQuizzes, progress.totalQuizzes - progress.completedQuizzes],
          backgroundColor: ['#4CAF50', '#E8F5E9'],
          borderColor: ['#388E3C', '#C8E6C9'],
          borderWidth: 2,
          hoverBackgroundColor: ['#66BB6A', '#F1F8E9']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#000',
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                return `${context.label}: ${context.raw} quiz`;
              }
            }
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });
  }

  // DIAGRAMME DROIT_DU_CITOYEN - Barres horizontales style juridique
  private createDroitChart(): void {
    if (this.droitChart) {
      this.droitChart.destroy();
    }

    const progress = this.categoryProgress['DROIT_DU_CITOYEN'];
    const ctx = this.droitChartRef.nativeElement.getContext('2d');
    
    this.droitChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Quizzes complétés', 'Quizzes restants'],
        datasets: [{
          data: [progress.completedQuizzes, progress.totalQuizzes - progress.completedQuizzes],
          backgroundColor: ['#2196F3', '#BBDEFB'],
          borderColor: ['#1976D2', '#90CAF9'],
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                return `${context.raw} quiz`;
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: progress.totalQuizzes,
            grid: {
              color: '#E3F2FD'
            },
            ticks: {
              color: '#1565C0'
            }
          },
          y: {
            grid: {
              color: '#E3F2FD'
            },
            ticks: {
              color: '#1565C0',
              font: {
                weight: 'bold'
              }
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        }
      }
    });
  }

  // DIAGRAMME DEVOIR_DU_CITOYEN - Jauge circulaire style éducation
  private createDevoirChart(): void {
    if (this.devoirChart) {
      this.devoirChart.destroy();
    }

    const progress = this.categoryProgress['DEVOIR_DU_CITOYEN'];
    const ctx = this.devoirChartRef.nativeElement.getContext('2d');
    
    // Configuration pour une jauge circulaire
    this.devoirChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Progression', 'Restant'],
        datasets: [{
          data: [progress.progressPercentage, 100 - progress.progressPercentage],
          backgroundColor: ['#FF9800', '#F5F5F5'],
          borderColor: ['#F57C00', '#E0E0E0'],
          borderWidth: 2,
          circumference: 180,
          rotation: 270
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                return `${context.raw}%`;
              }
            }
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });

    // Ajout du texte au centre pour la jauge
    const centerText = {
      id: 'centerText',
      afterDatasetsDraw(chart: any) {
        const { ctx, data } = chart;
        ctx.save();
        const x = chart.getDatasetMeta(0).data[0].x;
        const y = chart.getDatasetMeta(0).data[0].y;
        
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = '#E65100';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${progress.progressPercentage}%`, x, y - 10);
        
        ctx.font = '12px Arial';
        ctx.fillStyle = '#666';
        ctx.fillText('Complété', x, y + 15);
      }
    };

    Chart.register(centerText);
  }

  loadCategoryProgress(category: 'ENVIRONNEMENT' | 'DROIT_DU_CITOYEN' | 'DEVOIR_DU_CITOYEN'): void {
    this.activeCategory = category;
    this.apiService.getCategoryProgress(category).pipe(
      catchError((error) => {
        console.error('Category progress error:', error);
        return of(null);
      })
    ).subscribe((response: any) => {
      if (response?.data) {
        this.categoryProgress[category] = response.data;
        this.updateCategoryChart(category);
      }
    });
  }

  // Helper methods for change indicators
  isPositive(change: string | undefined): boolean {
    if (!change) return false;
    const cleanChange = change.replace('+', '').replace('%', '').trim();
    const numericValue = parseFloat(cleanChange);
    return !isNaN(numericValue) && numericValue > 0;
  }

  isNegative(change: string | undefined): boolean {
    if (!change) return false;
    const cleanChange = change.replace('+', '').replace('%', '').trim();
    const numericValue = parseFloat(cleanChange);
    return !isNaN(numericValue) && numericValue < 0;
  }

  refresh(): void {
    this.refreshing = true;
    this.loadDashboard();
    this.loadAllCategoryProgress();
  }

  // Méthode pour obtenir les statistiques d'une catégorie
  getCategoryStats(category: string): string {
    const progress = this.categoryProgress[category];
    return `${progress.completedQuizzes}/${progress.totalQuizzes} quizzes`;
  }
}