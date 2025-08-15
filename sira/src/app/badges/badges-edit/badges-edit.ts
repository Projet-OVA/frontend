import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-badges-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './badges-edit.html',
  styleUrls: ['./badges-edit.scss']
})
export class BadgesEdit implements OnInit {
  badgeId!: number;
  badge = {
    title: '',
    description: '',
    icon: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.badgeId = Number(this.route.snapshot.paramMap.get('id'));

    // ✅ Données statiques pour tester
    this.badge = {
      title: 'Super Star',
      description: 'Attribué aux utilisateurs très actifs 🌟',
      icon: '⭐'
    };
  }

  updateBadge() {
    console.log(`Badge ID=${this.badgeId} mis à jour :`, this.badge);
    alert(`Badge "${this.badge.title}" mis à jour avec succès ✅`);
    this.router.navigate(['/badges']);
  }

  cancel() {
    this.router.navigate(['/badges']);
  }
}
