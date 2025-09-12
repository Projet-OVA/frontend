import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.scss'],
  imports: [CommonModule, RouterModule],
})
export class AdminLayoutComponent {
  constructor(private router: Router) {}

  currentYear = new Date().getFullYear();

  logout() {
    // TODO: Ajouter la logique de déconnexion (supprimer le token etc.)
    this.router.navigate(['/login']);
  }
}

// import { Component } from '@angular/core';
// import { RouterModule, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-admin-layout',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './admin-layout.html',
//   styleUrls: ['./admin-layout.scss']
// })
// export class AdminLayoutComponent {
//   constructor(private router: Router) {}

//   logout() {
//     // TODO: Ajouter la logique de déconnexion (supprimer le token etc.)
//     this.router.navigate(['/login']);
//   }
// }
