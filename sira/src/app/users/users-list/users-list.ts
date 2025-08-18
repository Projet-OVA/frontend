import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.scss']
})
export class UsersList {
  pageTitle = 'Liste des utilisateurs';

  users = [
    { id: 1, name: 'Alice Dupont', email: 'alice@example.com', role: 'Admin', status: 'Actif' },
    { id: 2, name: 'Bob Martin', email: 'bob@example.com', role: 'Utilisateur', status: 'Suspendu' },
    { id: 3, name: 'Carla Gomez', email: 'carla@example.com', role: 'Utilisateur', status: 'Actif' },
    { id: 4, name: 'David Lee', email: 'david@example.com', role: 'Admin', status: 'Actif' },
    { id: 5, name: 'Emma Johnson', email: 'emma@example.com', role: 'Utilisateur', status: 'Actif' },
  ];

  // Actions fictives
  editUser(user: any) {
    alert(`Éditer l'utilisateur : ${user.name}`);
  }

  deleteUser(user: any) {
    if (confirm(`Supprimer l'utilisateur : ${user.name} ?`)) {
      this.users = this.users.filter(u => u.id !== user.id);
    }
  }
}
