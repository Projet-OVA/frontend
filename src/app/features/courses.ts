import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.html',
  styleUrls: ['./courses.scss'],
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  filterStatus: string = '';

  // Modals et états
  showCourseDialog = false;
  showQuizDialog = false;
  savingCourse = false;
  savingQuiz = false;

  newCourse: any = {};
  selectedCourse: any = null;
  newQuiz: any = {
    nom: '',
    description: '',
    score: 100,
    questions: [],
  };

  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  // ====================
  // Gestion des cours
  // ====================
  loadCourses() {
    this.api.getCourses().subscribe({
      next: (res: any) => {
        this.courses = res.courses;
      },
      error: (err) => {
        console.error('Erreur chargement cours:', err);
      },
    });
  }

  openCourseDialog(course?: any) {
    this.newCourse = course ? { ...course } : { nom: '', category: '', description: '', status: 'DRAFT' };
    this.showCourseDialog = true;
  }

  saveCourse() {
    if (!this.newCourse.nom || !this.newCourse.category) {
      alert('Nom et catégorie sont obligatoires');
      return;
    }

    this.savingCourse = true;

    const form: any = {
      nom: this.newCourse.nom,
      category: this.newCourse.category,
      description: this.newCourse.description || '',
      status: this.newCourse.status || 'DRAFT',
    };

    const obs = this.newCourse.id
      ? this.api.updateCourse(this.newCourse.id, form)
      : this.api.createCourse(form);

    obs.subscribe({
      next: () => {
        this.savingCourse = false;
        this.showCourseDialog = false;
        this.newCourse = {};
        this.loadCourses();
      },
      error: (err) => {
        console.error('Erreur sauvegarde cours:', err);
        this.savingCourse = false;
        alert('Erreur sauvegarde cours');
      },
    });
  }

  delete(course: any) {
    if (!confirm('Supprimer ce cours ?')) return;
    this.api.deleteCourse(course.id).subscribe({
      next: () => this.loadCourses(),
      error: (err) => console.error(err),
    });
  }

  publish(course: any) {
    const updated = { ...course, status: 'PUBLISHED' };
    this.api.updateCourse(course.id, updated).subscribe({
      next: () => this.loadCourses(),
      error: (err) => console.error(err),
    });
  }

  // ====================
  // Gestion des quiz
  // ====================
  openQuizDialog(course: any) {
    this.selectedCourse = course;
    this.newQuiz = {
      nom: '',
      description: '',
      score: 100,
      questions: [],
    };
    this.showQuizDialog = true;
  }

  addQuestion() {
    this.newQuiz.questions.push({ content: '', options: [] });
  }

  addOption(questionIndex: number) {
    this.newQuiz.questions[questionIndex].options.push({ content: '', isCorrect: false });
  }

  saveQuiz() {
    if (!this.newQuiz.nom) {
      alert('Le nom du quiz est obligatoire');
      return;
    }

    const payload = {
      nom: this.newQuiz.nom,
      description: this.newQuiz.description,
      score: this.newQuiz.score || 100,
      courseId: this.selectedCourse.id,
      questions: this.newQuiz.questions,
    };

    this.savingQuiz = true;

    this.api.createQuiz(payload).subscribe({
      next: (res) => {
        this.savingQuiz = false;
        this.showQuizDialog = false;
        this.loadCourses(); // recharge les cours avec quiz
      },
      error: (err) => {
        this.savingQuiz = false;
        console.error('Erreur création quiz:', err);
        alert('Erreur création quiz');
      },
    });
  }

  // courses.component.ts
  selectedCourseDetails: any = null;
  showDetailsDialog = false;

  openDetailsDialog(course: any) {
    this.selectedCourseDetails = course;
    this.showDetailsDialog = true;
  }

  closeDetailsDialog() {
    this.showDetailsDialog = false;
    this.selectedCourseDetails = null;
  }
}
