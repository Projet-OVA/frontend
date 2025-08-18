import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-badge-detail',
  templateUrl: './badge-detail.html',
  styleUrls: ['./badge-detail.scss']
})
export class BadgeDetail {
  id!: string;
  badge: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id')!;
    // ⚡ Contenu statique pour l’instant
    this.badge = {
      id: this.id,
      title: 'Badge Expert Angular',
      description: 'Attribué aux utilisateurs ayant complété tous les parcours Angular.',
      level: 'Expert',
      earnedBy: 42
    };
  }

  goBack() {
    this.router.navigate(['/badges']);
  }
}
