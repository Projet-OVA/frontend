import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-quotas',
  imports: [CommonModule],
  templateUrl: './quotas.html',
  styleUrls: ['./quotas.scss']
})
export class Quotas {
  quotas = [
    { name: 'Stockage (Mo)', used: 450, limit: 1000 },
    { name: 'API Calls', used: 750, limit: 1000 },
    { name: 'Utilisateurs actifs', used: 120, limit: 200 }
  ];
}
