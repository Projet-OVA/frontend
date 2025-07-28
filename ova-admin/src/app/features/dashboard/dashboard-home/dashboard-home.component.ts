import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js'; // ✅ supprime ChartType

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {
  title = 'Tableau de bord';

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Activité des modules'
      }
    }
  };

  public barChartType: 'bar' = 'bar';

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Parcours', 'Récits', 'Défis', 'Quiz', 'Utilisateurs'],
    datasets: [
      {
        data: [12, 19, 3, 5, 8],
        label: 'Cette semaine',
        backgroundColor: '#42A5F5'
      }
    ]
  };
}
