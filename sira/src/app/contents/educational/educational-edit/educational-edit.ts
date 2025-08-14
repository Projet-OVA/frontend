import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-educational-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './educational-edit.html',
  styleUrls: ['./educational-edit.scss']
})
export class EducationalEdit {
  pageTitle = 'Modifier un contenu éducatif';
  educationalId: number | null = null;

  // Exemple de données fictives (à remplacer plus tard par API)
  educational = {
    title: 'Introduction à Angular',
    category: 'Programmation',
    description: 'Cours d’initiation à Angular avec composants standalone.'
  };

  constructor(private route: ActivatedRoute) {
    this.educationalId = Number(this.route.snapshot.paramMap.get('id'));
  }

  save() {
    alert(`✅ Contenu #${this.educationalId} modifié : ${this.educational.title}`);
  }
}
