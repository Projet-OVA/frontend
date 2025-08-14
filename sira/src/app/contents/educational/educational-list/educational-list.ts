import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-educational-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './educational-list.html',
  styleUrls: ['./educational-list.scss']
})
export class EducationalList {
  pageTitle = 'Parcours éducatifs';

  courses = [
    { id: 1, title: 'Introduction à Angular', level: 'Débutant', duration: '4h', status: 'Publié' },
    { id: 2, title: 'Node.js avancé', level: 'Avancé', duration: '6h', status: 'Brouillon' },
    { id: 3, title: 'Bases de Python', level: 'Débutant', duration: '5h', status: 'Publié' },
    { id: 4, title: 'Machine Learning', level: 'Intermédiaire', duration: '8h', status: 'Publié' },
  ];

  createCourse() {
    alert('Redirection vers la création de parcours');
  }

  editCourse(course: any) {
    alert(`Éditer le parcours : ${course.title}`);
  }

  deleteCourse(course: any) {
    if (confirm(`Supprimer le parcours : ${course.title} ?`)) {
      this.courses = this.courses.filter(c => c.id !== course.id);
    }
  }
}
