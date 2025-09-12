import { CommonModule } from '@angular/common';
import { ApiService } from '../core/api.service';
import { Component, OnInit, AfterViewInit, inject } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})

export class DashboardComponent implements OnInit {
  stats: any = {};

  ngOnInit(): void {
    // TODO: appeler API Nest pour récupérer les statistiques globales
    this.stats = {
      users: 120,
      contents: 45,
      badges: 12,
    };
  }

}



// import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Chart, ChartConfiguration, registerables } from 'chart.js';
// import { ApiService } from '../../core/api.service'; // ← À créer ensuite
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';

// Chart.register(...registerables);

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './dashboard.html',
//   styleUrls: ['./dashboard.scss']
// })
// export class DashboardComponent implements OnInit, AfterViewInit {

//   private api = inject(ApiService);
//   private router = inject(Router);

//   stats: any = {
//     users: 0,
//     contents: 0,
//     badges: 0,
//     topContents: [],
//     recent: []
//   };

//   ngOnInit(): void {
//     this.loadStats();
//   }

//   ngAfterViewInit(): void {
//     this.initUserChart();
//   }

//   loadStats(): void {
//     // 📝 Exemple de requête (à implémenter dans ton ApiService)
//     /*
//     this.api.get('/dashboard/stats').subscribe(data => {
//       this.stats = data;
//       this.updateUserChart(data.userActivity);
//     });
//     */
//   }

//   initUserChart(): void {
//     const ctx = document.getElementById('chart-users') as HTMLCanvasElement;

//     const config: ChartConfiguration = {
//       type: 'line',
//       data: {
//         labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
//         datasets: [{
//           label: 'Utilisateurs actifs',
//           data: [12, 19, 3, 5, 2, 3, 9],
//           fill: true,
//           borderColor: '#3b82f6',
//           backgroundColor: 'rgba(59, 130, 246, 0.2)',
//           tension: 0.3
//         }]
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: {
//             display: true
//           }
//         },
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     };

//     new Chart(ctx, config);
//   }

//   updateUserChart(data: number[]): void {
//     // Si tu veux mettre à jour les données dynamiquement plus tard
//   }

// }
