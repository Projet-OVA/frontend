import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-badges-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './badges-create.html',
  styleUrls: ['./badges-create.scss']
})
export class BadgesCreate {
  badge = {
    title: '',
    description: '',
    icon: ''
  };

  constructor(private router: Router) {}

  saveBadge() {
    console.log('Nouveau badge créé :', this.badge);
    alert(`Badge "${this.badge.title}" créé avec succès ✅`);
    this.router.navigate(['/badges']);
  }

  cancel() {
    this.router.navigate(['/badges']);
  }
}
