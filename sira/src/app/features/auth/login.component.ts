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

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful, redirecting...');
        // Redirection vers le dashboard (qui est maintenant une route enfant)
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login error', error);
        alert('Erreur de connexion: ' + (error.error?.message || error.message));
      },
    });
  }
}