import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss'],
})
export class ReportsComponent implements OnInit {
  reportType = 'users'; // ← Ajouter
  from = ''; // ← Ajouter
  to = ''; // ← Ajouter
  reports: any[] = [];

  ngOnInit(): void {
    // TODO: appeler API Nest pour récupérer les rapports
    this.reports = [
      { id: 1, title: 'Rapport 1' },
      { id: 2, title: 'Rapport 2' },
    ];
  }

  load() {}
  export(format: string) {}

}




// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ApiService } from '../core/api.service';

// @Component({
//   selector: 'app-reports',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './reports.html',
//   styleUrls: ['./reports.scss']
// })
// export class ReportsComponent implements OnInit {
//   reports: any[] = [];

//   constructor(private api: ApiService) {}

//   ngOnInit() {
//     // TODO: Remplacer 'reports' par ton endpoint Nest
//     this.api.get<any[]>('reports').subscribe(data => {
//       this.reports = data;
//     });
//   }
// }
