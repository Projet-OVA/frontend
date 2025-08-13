import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  pageTitle = 'Tableau de bord';
  stats = [
    { label: 'Badges', value: 42 },
    { label: 'Challenges', value: 17 },
    { label: 'Utilisateurs', value: 1200 },
  ];
}
