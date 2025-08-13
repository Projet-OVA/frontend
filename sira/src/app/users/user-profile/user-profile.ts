// src/app/users/user-profile/user-profile.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss']
})
export class UserProfile implements OnInit {
  userId: string | null = null;
  user: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');

    // Données fictives pour test
    this.user = {
      id: this.userId,
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      role: 'Admin',
      status: 'Actif',
      createdAt: '2025-01-15'
    };
  }
}
