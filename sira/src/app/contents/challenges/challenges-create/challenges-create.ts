import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenges-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './challenges-create.html',
  styleUrls: ['./challenges-create.scss']
})
export class ChallengesCreate {
  challengeForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.challengeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      status: ['À venir', Validators.required],
    });
  }

  onSubmit() {
    if (this.challengeForm.valid) {
      console.log('Défi créé ✅', this.challengeForm.value);
      // 🔜 Ici tu feras l’appel API pour sauvegarder le défi
      this.router.navigate(['/challenges']); // redirection vers la liste
    }
  }
}
