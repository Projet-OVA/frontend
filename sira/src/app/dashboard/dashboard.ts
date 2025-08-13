import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // <-- Import ici
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
// export class Dashboard {
//   pageTitle = 'Tableau de bord';
//   stats = [
//     { label: 'Badges', value: 42 },
//     { label: 'Challenges', value: 17 },
//     { label: 'Utilisateurs', value: 1200 },
//   ];
// }
export class Dashboard implements OnInit {
  stats: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/api/dashboard/summary').subscribe((data) => {
      this.stats = data;
    });
  }
}