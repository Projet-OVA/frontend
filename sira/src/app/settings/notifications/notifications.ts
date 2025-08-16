import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-notifications',
  standalone: true,              // important pour standalone
  imports: [CommonModule, FormsModule],  // ✅ on ajoute FormsModule
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.scss']
})
export class Notifications {
  notifications = [
    { type: 'Email', description: 'Recevoir les notifications par email', enabled: true },
    { type: 'Push', description: 'Recevoir des alertes push sur mobile', enabled: false },
    { type: 'SMS', description: 'Recevoir les alertes par SMS', enabled: false }
  ];
}
