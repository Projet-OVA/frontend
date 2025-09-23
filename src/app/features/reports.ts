import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/api.service';
import * as XLSX from 'xlsx';
import Chart from 'chart.js/auto';

interface DashboardData {
  userStats: {
    totalUsers: number;
    activeUsers: number;
  };
  eventStats: {
    totalEvents: number;
  };
  badgeStats: {
    totalBadges: number;
    badgeDistribution: { [key: string]: number };
  };
  courseProgress: {
    completionRate: string;
    completionRateChange: string;
    averageTime: string;
    averageTimeChange: string;
  };
  communityEngagement: {
    engagementRate: string;
    engagementRateChange: string;
  };
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss']
})
export class ReportsComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  
  reportType = 'users';
  from: string = '';
  to: string = '';
  reports: any[] = [];
  loading = false;
  chart: any;
  
  dashboardData: DashboardData | null = null;

  constructor(private apiService: ApiService) {
    // Définir les dates par défaut (mois en cours)
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    this.from = this.formatDate(firstDay);
    this.to = this.formatDate(today);
  }

  ngOnInit() {
    this.loadDashboardData();
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  loadDashboardData(): void {
    this.loading = true;
    this.apiService.getDashboardData().subscribe({
      next: (data: any) => {
        this.dashboardData = data;
        this.generateReports();
        this.loading = false;
        setTimeout(() => this.createChart(), 100);
      },
      error: (error) => {
        console.error('Erreur chargement données dashboard:', error);
        this.loading = false;
      }
    });
  }

  load() {
    this.generateReports();
    setTimeout(() => this.createChart(), 100);
  }

  private generateReports() {
    if (!this.dashboardData) return;

    if (this.reportType === 'users') {
      this.reports = [
        { title: 'Utilisateurs totaux', value: this.dashboardData.userStats.totalUsers },
        { title: 'Utilisateurs actifs', value: this.dashboardData.userStats.activeUsers },
        { title: 'Taux d\'activité', value: this.calculateActivityRate() + '%' },
        { title: 'Évolution utilisateurs', value: this.dashboardData.userStats.totalUsers + ' (total)' }
      ];
    } else {
      this.reports = [
        { title: 'Événements totaux', value: this.dashboardData.eventStats.totalEvents },
        { title: 'Badges attribués', value: this.dashboardData.badgeStats.totalBadges },
        { title: 'Taux de complétion', value: this.dashboardData.courseProgress.completionRate },
        { title: 'Taux d\'engagement', value: this.dashboardData.communityEngagement.engagementRate }
      ];
    }
  }

  private calculateActivityRate(): number {
    if (!this.dashboardData || this.dashboardData.userStats.totalUsers === 0) return 0;
    return Math.round((this.dashboardData.userStats.activeUsers / this.dashboardData.userStats.totalUsers) * 100);
  }

  private createChart() {
    if (!this.dashboardData || !this.chartCanvas) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // Détruire le chart existant
    if (this.chart) {
      this.chart.destroy();
    }

    if (this.reportType === 'users') {
      this.createUserChart(ctx);
    } else {
      this.createContentChart(ctx);
    }
  }

  private createUserChart(ctx: CanvasRenderingContext2D) {
    if (!this.dashboardData) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Utilisateurs totaux', 'Utilisateurs actifs'],
        datasets: [{
          label: 'Statistiques utilisateurs',
          data: [
            this.dashboardData.userStats.totalUsers,
            this.dashboardData.userStats.activeUsers
          ],
          backgroundColor: [
            'rgba(211, 47, 47, 0.8)',
            'rgba(33, 37, 41, 0.8)'
          ],
          borderColor: [
            'rgb(211, 47, 47)',
            'rgb(33, 37, 41)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Statistiques des Utilisateurs',
            color: '#d32f2f',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#666'
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#666'
            },
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  private createContentChart(ctx: CanvasRenderingContext2D) {
    if (!this.dashboardData) return;

    const badgeLabels = Object.keys(this.dashboardData.badgeStats.badgeDistribution);
    const badgeData = Object.values(this.dashboardData.badgeStats.badgeDistribution);

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: badgeLabels,
        datasets: [{
          data: badgeData,
          backgroundColor: [
            'rgba(211, 47, 47, 0.8)',
            'rgba(33, 37, 41, 0.8)',
            'rgba(249, 115, 22, 0.8)',
            'rgba(107, 114, 128, 0.8)',
            'rgba(16, 185, 129, 0.8)'
          ],
          borderColor: [
            'rgb(211, 47, 47)',
            'rgb(33, 37, 41)',
            'rgb(249, 115, 22)',
            'rgb(107, 114, 128)',
            'rgb(16, 185, 129)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#666',
              font: {
                size: 12
              }
            }
          },
          title: {
            display: true,
            text: 'Distribution des Badges',
            color: '#d32f2f',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        }
      }
    });
  }

  export(format: 'csv' | 'xlsx') {
    if (!this.dashboardData) {
      alert('Veuillez attendre le chargement des données');
      return;
    }

    const data = this.prepareExportData();
    const filename = `rapport_sira_${this.reportType}_${this.from}_${this.to}`;

    if (format === 'csv') {
      this.exportToCSV(data, filename);
    } else {
      this.exportToExcel(data, filename);
    }
  }

  private prepareExportData(): any[] {
    if (!this.dashboardData) return [];

    const data = [];
    
    // En-têtes
    data.push(['Rapport SIRA - Données du Dashboard']);
    data.push(['Généré le', new Date().toLocaleDateString('fr-FR')]);
    data.push(['Période', `${this.from} au ${this.to}`]);
    data.push(['Type de rapport', this.reportType === 'users' ? 'Utilisateurs' : 'Contenus']);
    data.push([]);
    
    // Statistiques générales
    data.push(['STATISTIQUES GÉNÉRALES']);
    data.push(['Utilisateurs totaux', this.dashboardData.userStats.totalUsers]);
    data.push(['Utilisateurs actifs', this.dashboardData.userStats.activeUsers]);
    data.push(['Taux d\'activité', this.calculateActivityRate() + '%']);
    data.push(['Événements totaux', this.dashboardData.eventStats.totalEvents]);
    data.push([]);
    
    // Badges
    data.push(['DISTRIBUTION DES BADGES']);
    data.push(['Total badges attribués', this.dashboardData.badgeStats.totalBadges]);
    Object.entries(this.dashboardData.badgeStats.badgeDistribution).forEach(([badge, count]) => {
      data.push([badge, count]);
    });
    data.push([]);
    
    // Progressions
    data.push(['STATISTIQUES DE PROGRESSION']);
    data.push(['Taux de complétion', this.dashboardData.courseProgress.completionRate]);
    data.push(['Variation taux de complétion', this.dashboardData.courseProgress.completionRateChange]);
    data.push(['Temps moyen', this.dashboardData.courseProgress.averageTime]);
    data.push(['Variation temps moyen', this.dashboardData.courseProgress.averageTimeChange]);
    data.push([]);
    
    // Engagement
    data.push(['ENGAGEMENT COMMUNAUTAIRE']);
    data.push(['Taux d\'engagement', this.dashboardData.communityEngagement.engagementRate]);
    data.push(['Variation engagement', this.dashboardData.communityEngagement.engagementRateChange]);

    return data;
  }

  private exportToCSV(data: any[], filename: string) {
    const csvContent = data.map(row => 
      row.map((cell: any) => `"${cell}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  private exportToExcel(data: any[], filename: string) {
    try {
      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      
      XLSX.utils.book_append_sheet(wb, ws, 'Rapport SIRA');
      XLSX.writeFile(wb, `${filename}.xlsx`);
    } catch (error) {
      console.error('Erreur lors de l\'export Excel:', error);
      alert('Erreur lors de l\'export Excel. Vérifiez la console pour plus de détails.');
    }
  }

  print() {
    window.print();
  }
}