import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./users.scss'],
})
export class UsersComponent implements OnInit {
  q = '';
  filterStatus = '';
  users: any[] = [];
  filteredUsers: any[] = [];

  newUser = { name: '', email: '', age: null };

  selectedUser: any = null;

  @ViewChild('createDialog') createDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('viewDialog') viewDialog!: ElementRef<HTMLDialogElement>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.users = [
      { id: 1, name: 'Alice', email: 'alice@test.com', age: 30, status: 'Actif', progress: { overall: 50 }, badges: ['⭐'] },
      { id: 2, name: 'Bob', email: 'bob@test.com', age: 23, status: 'Suspendu', progress: { overall: 10 }, badges: [] },
    ];
    this.applyFilters();
  }

  applyFilters() {
    const query = this.q.toLowerCase();
    this.filteredUsers = this.users.filter(u => {
      const matchesQuery =
        !query || u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query);
      const matchesStatus = !this.filterStatus || u.status === this.filterStatus;
      return matchesQuery && matchesStatus;
    });
  }

  openCreateDialog() {
    this.newUser = { name: '', email: '', age: null };
    this.createDialog.nativeElement.showModal();
  }

  createUser(e: Event) {
    e.preventDefault();
    const newU = { ...this.newUser, id: Date.now(), status: 'Actif', progress: { overall: 0 }, badges: [] };
    this.users.push(newU);
    this.applyFilters();
    this.createDialog.nativeElement.close();
  }

  openViewDialog(u: any) {
    this.selectedUser = u;
    this.viewDialog.nativeElement.showModal();
  }

  suspendUser(u: any) {
    u.status = 'Suspendu';
    this.applyFilters();
  }

  reactivateUser(u: any) {
    u.status = 'Actif';
    this.applyFilters();
  }
}




// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ApiService } from '../core/api.service';

// @Component({
//   selector: 'app-users',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './users.html',
//   styleUrls: ['./users.scss']
// })
// export class UsersComponent implements OnInit {
//   users: any[] = [];
//   search = '';

//   constructor(private api: ApiService) {}

//   ngOnInit() {
//     this.loadUsers();
//   }

//   loadUsers() {
//     // TODO: Remplacer 'users' par ton endpoint Nest
//     this.api.get<any[]>('users').subscribe(data => {
//       this.users = data;
//     });
//   }
// }
