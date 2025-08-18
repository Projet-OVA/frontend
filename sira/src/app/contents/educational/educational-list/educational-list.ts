import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-educational-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
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

  
  constructor(private router: Router) {}

  ngOnInit(): void {}

  createCourse() {
    // redirection vers la page de création
    this.router.navigate(['/educational/create']);
  }

  editCourse(course: any) {
    this.router.navigate(['/educational/edit', course.id]);
  }

  deleteCourse(course: any) {
    if (confirm(`Voulez-vous supprimer le parcours "${course.title}" ?`)) {
      // appeler ton endpoint DELETE /educational/:id ici
      console.log('Supprimer', course.id);
    }
  }
}