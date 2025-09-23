import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // Validation basique
    if (!this.email || !this.password) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    // Activation du loading
    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful, redirecting...');
        
        // Petit délai pour montrer le succès avant la redirection
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        }, 1000);
      },
      error: (error) => {
        console.error('Login error', error);
        this.isLoading = false;
        
        // Message d'erreur plus détaillé
        const errorMessage = error.error?.message || 
                           error.message || 
                           'Erreur de connexion au serveur';
        alert('Erreur de connexion: ' + errorMessage);
      },
    });
  }
}