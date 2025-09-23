import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  username: string;
  phoneNumber?: string;
  role: string;
  createdAt: string;
}

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = false;
  selectedUser: User | null = null;
  showDetailsDialog = false;
  showEditDialog = false;
  saving = false;
  userBadges: any[] = [];
  loadingBadges = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.api.getUsers().subscribe({
      next: (res: any) => {
        this.users = res.filter((u: User) => u.role === 'CITIZEN');
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement utilisateurs', err);
        this.loading = false;
      },
    });
  }

  openDetails(user: User) {
    this.selectedUser = user;
    this.showDetailsDialog = true;
    this.loadUserBadges(user.id);
  }

loadUserBadges(userId: string) {
  this.loadingBadges = true;
  this.api.getUserBadges(userId).subscribe({
    next: (res) => {
      this.userBadges = res;
      this.loadingBadges = false;
    },
    error: (err) => {
      console.error('Erreur chargement badges', err);
      this.userBadges = [];
      this.loadingBadges = false;
    },
  });
}


  saveUser() {
    if (!this.selectedUser) return;
    this.saving = true;
    this.api.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
      next: () => {
        this.saving = false;
        this.showEditDialog = false;
        this.loadUsers();
      },
      error: (err) => {
        console.error('Erreur sauvegarde utilisateur', err);
        this.saving = false;
      },
    });
  }

  deleteUser(user: User) {
    if (!confirm(`Supprimer l'utilisateur ${user.nom} ?`)) return;
    this.api.deleteUser(user.id).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error('Erreur suppression utilisateur', err),
    });
  }
}
