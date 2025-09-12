import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./users.scss'],
})
export class UsersComponent implements OnInit {
  q = ''; // ← Ajouter
  filterStatus = ''; // ← Ajouter
  users: any[] = [];

  private privateRouter: Router;
  public get router() {
    return this.privateRouter;
  }

  constructor(privateRouter: Router) {
    this.privateRouter = privateRouter;
  }

  load() {}
  reactivateUser(id: number) {}

  ngOnInit(): void {
    // TODO: appeler API Nest pour lister les utilisateurs
    this.users = [
      { id: 1, name: 'Alice', email: 'alice@test.com' },
      { id: 2, name: 'Bob', email: 'bob@test.com' },
    ];
  }

  deleteUser(id: number) {
    // TODO: appeler API Nest pour supprimer un utilisateur
    console.log('Suppression utilisateur', id);
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
