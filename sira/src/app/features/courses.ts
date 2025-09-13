import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.html',
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  loading = false;
  error = '';
  showDialog = false;
  saving = false;
  filterStatus = '';

  newCourse: any = {
    name: '',
    category: '',
    title: '',
    description: '',
    language: 'FR',
    duration: '',
    status: 'DRAFT'
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.loading = true;
    this.api.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur chargement';
        this.loading = false;
      }
    });
  }

  openDialog(course?: any) {
    this.newCourse = course ? { ...course } : {
      name: '',
      category: '',
      title: '',
      description: '',
      language: 'FR',
      duration: '',
      status: 'DRAFT'
    };
    this.showDialog = true;
  }

  save() {
    if (!this.newCourse.name || !this.newCourse.category) {
      alert('Nom et catégorie sont obligatoires');
      return;
    }

    this.saving = true;
    const form = new FormData();
    form.append('name', this.newCourse.name);
    form.append('category', this.newCourse.category);
    form.append('title', this.newCourse.title || '');
    form.append('description', this.newCourse.description || '');
    form.append('language', this.newCourse.language);
    form.append('duration', this.newCourse.duration || '');
    form.append('status', this.newCourse.status);

    const obs = this.newCourse.id 
      ? this.api.updateCourse(this.newCourse.id, form)
      : this.api.createCourse(form);

    obs.subscribe({
      next: () => {
        this.saving = false;
        this.showDialog = false;
        this.loadCourses();
      },
      error: (err) => {
        console.error(err);
        this.saving = false;
        alert('Erreur: ' + (err.error?.message || 'Erreur sauvegarde'));
      }
    });
  }

  delete(course: any) {
    if (!confirm('Supprimer ce cours ?')) return;
    this.api.deleteCourse(course.id).subscribe({
      next: () => this.loadCourses(),
      error: () => alert('Erreur suppression')
    });
  }

  publish(course: any) {
    const form = new FormData();
    form.append('status', 'PUBLISHED');
    this.api.updateCourse(course.id, form).subscribe({
      next: () => this.loadCourses(),
      error: () => alert('Erreur publication')
    });
  }
}