import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-challenges-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './challenges-edit.html',
  styleUrls: ['./challenges-edit.scss']
})
export class ChallengesEdit implements OnInit {
  challengeForm!: FormGroup;
  challengeId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // récupérer l'id depuis l'URL
    this.challengeId = Number(this.route.snapshot.paramMap.get('id'));

    // créer le formulaire
    this.challengeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      status: ['En cours', Validators.required],
    });

    // ⚡ pour le test, on simule des données récupérées
    const fakeChallenge = {
      id: this.challengeId,
      title: 'Défi Exemple',
      description: 'Ceci est une description de défi pour tester la modification.',
      status: 'En cours'
    };

    // pré-remplir le formulaire
    this.challengeForm.patchValue(fakeChallenge);
  }

  onSubmit() {
    if (this.challengeForm.valid) {
      console.log('Défi modifié ✅', { id: this.challengeId, ...this.challengeForm.value });
      // 🔜 ici tu feras un appel API PUT/PATCH
      this.router.navigate(['/challenges']); // retour vers la liste
    }
  }
}
