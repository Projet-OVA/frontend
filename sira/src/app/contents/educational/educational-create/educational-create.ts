import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-educational-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './educational-create.html',
  styleUrls: ['./educational-create.scss']
})
export class EducationalCreate {
  pageTitle = 'Créer un parcours éducatif';

  newCourse = {
    title: '',
    level: 'Débutant',
    duration: '',
    description: '',
  };

  saveCourse() {
    if (!this.newCourse.title || !this.newCourse.duration) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    alert(`Parcours "${this.newCourse.title}" créé avec succès 🎉`);
    console.log('Parcours sauvegardé', this.newCourse);

    // reset form
    this.newCourse = {
      title: '',
      level: 'Débutant',
      duration: '',
      description: '',
    };
  }
}
