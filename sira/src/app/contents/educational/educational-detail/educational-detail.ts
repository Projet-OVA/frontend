import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-educational-detail',
  imports: [CommonModule],
  templateUrl: './educational-detail.html',
  styleUrls: ['./educational-detail.scss']
})
export class EducationalDetail implements OnInit {
  id!: number;
  course: any;

  // Simuler les données, idéalement à remplacer par un endpoint GET /educational/:id
  courses = [
    { id: 1, title: 'Introduction à Angular', level: 'Débutant', duration: '4h', status: 'Publié' },
    { id: 2, title: 'Node.js avancé', level: 'Avancé', duration: '6h', status: 'Brouillon' },
    { id: 3, title: 'Bases de Python', level: 'Débutant', duration: '5h', status: 'Publié' },
    { id: 4, title: 'Machine Learning', level: 'Intermédiaire', duration: '8h', status: 'Publié' },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.course = this.courses.find(c => c.id === this.id);
  }

  goBack() {
    this.router.navigate(['/educational']);
  }

  editCourse() {
    this.router.navigate(['/educational/edit', this.id]);
  }
}
