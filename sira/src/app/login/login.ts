import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  pageTitle = 'Connexion';
  email = '';
  password = '';

  // Action fictive pour tester
  login() {
    if (this.email && this.password) {
      alert(`Connexion réussie : ${this.email}`);
    } else {
      alert('Veuillez remplir tous les champs');
    }
  }
}
