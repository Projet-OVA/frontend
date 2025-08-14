import { Component, OnInit } from '@angular/core';
import { Badge, BadgeService } from '../badge.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-badges-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './badges-list.html',
  styleUrls: ['./badges-list.scss']
})
export class BadgesList implements OnInit {
  badges: Badge[] = [];
  isLoading: boolean = true;

  constructor(private badgeService: BadgeService) {}

  ngOnInit(): void {
    this.loadBadges();
  }

  loadBadges(): void {
    this.badgeService.getBadges().subscribe({
      next: (data) => {
        this.badges = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des badges', err);
        this.isLoading = false;
      }
    });
  }

  deleteBadge(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce badge ?')) {
      this.badgeService.deleteBadge(id);
      this.loadBadges(); // Recharge la liste
    }
  }
}
