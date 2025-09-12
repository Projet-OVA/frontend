import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  login() {
    // TODO: appeler API Nest pour authentification
    if (this.email && this.password) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Veuillez entrer un email et un mot de passe valides.';
    }
  }
}


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ApiService } from '../../core/api.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {
//   email = '';
//   password = '';
//   error = '';

//   constructor(private api: ApiService, private router: Router) {}

//   login() {
//     // TODO: Remplacer par un vrai appel NestJS d'authentification
//     if (this.email && this.password) {
//       this.router.navigate(['/dashboard']);
//     } else {
//       this.error = 'Veuillez entrer un email et un mot de passe valides.';
//     }
//   }
// }
