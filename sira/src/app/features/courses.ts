import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.html',
  styleUrls: ['./courses.scss'],
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  loading = false;
  error = '';
  showDialog = false;
  saving = false;
  filterStatus = '';
  selectedFile: File | null = null;

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Fichier sélectionné :', file.name);
    }
  }

  // newCourse: any = {
  //   nom: '',
  //   category: '',
  //   description: '',
  //   status: 'DRAFT',
  // };

  newCourse: any = {
    nom: '',
    category: '',
    description: '',
    status: 'DRAFT',
    quiz: {
      nom: '',
      description: '',
      score: 100,
      questions: [
        // Chaque question aura: content + options [{content, isCorrect}]
      ],
    },
  };

  addQuestion() {
    this.newCourse.quiz.questions.push({
      content: '',
      options: [],
    });
  }

  addOption(question: any) {
    question.options.push({ content: '', isCorrect: false });
  }

  removeQuestion(index: number) {
    this.newCourse.quiz.questions.splice(index, 1);
  }

  removeOption(question: any, index: number) {
    question.options.splice(index, 1);
  }

  constructor(private api: ApiService, private authService: AuthService) {}

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
      },
    });
  }

  openDialog(course?: any) {
    this.newCourse = course
      ? { ...course }
      : {
          nom: '',
          category: '',
          description: '',
          status: 'DRAFT',
          creatorId: this.authService.getUser()?.id,
        };
    this.selectedFile = null;
    this.showDialog = true;
  }

  save() {
    if (!this.newCourse.nom || !this.newCourse.category) {
      alert('Nom et catégorie sont obligatoires');
      return;
    }

    this.saving = true;

    // --- Création du FormData pour le cours ---
    const form = new FormData();
    form.append('nom', this.newCourse.nom);
    form.append('category', this.newCourse.category);
    form.append('description', this.newCourse.description || '');
    form.append('status', this.newCourse.status || 'DRAFT');

    const creatorId = this.authService.getUser()?.id;
    if (creatorId) form.append('creatorId', creatorId);

    if (this.selectedFile) {
      form.append('attachment', this.selectedFile);
    }

    // --- Création / mise à jour du cours ---
    const obs = this.newCourse.id
      ? this.api.updateCourse(this.newCourse.id, form)
      : this.api.createCourse(form);

    obs.subscribe({
      next: (courseResponse: any) => {
        // ID du cours créé ou mis à jour
        const courseId = courseResponse?.id || this.newCourse.id;

        // --- Gestion du quiz ---
        if (this.newCourse.quiz && this.newCourse.quiz.nom) {
          const quizPayload = {
            nom: this.newCourse.quiz.nom,
            description: this.newCourse.quiz.description || '',
            score: this.newCourse.quiz.score || 100,
            courseId: courseId,
            questions:
              this.newCourse.quiz.questions?.map((q: any) => ({
                content: q.content,
                options:
                  q.options?.map((o: any) => ({
                    content: o.content,
                    isCorrect: o.isCorrect || false,
                  })) || [],
              })) || [],
          };

          // Création du quiz via l'API
          this.api.createQuiz(quizPayload).subscribe({
            next: () => {
              console.log('Quiz créé avec succès');
            },
            error: (err) => {
              console.error('Erreur création quiz:', err.error);
              alert('Erreur création quiz: ' + (err.error?.message || 'Erreur'));
            },
          });
        }

        // --- Finalisation ---
        this.saving = false;
        this.showDialog = false;
        this.selectedFile = null;
        this.newCourse = {
          nom: '',
          category: '',
          description: '',
          status: 'DRAFT',
          quiz: { questions: [] },
        };
        this.loadCourses();
      },
      error: (err) => {
        console.error('Erreur détaillée:', err.error);
        this.saving = false;
        alert('Erreur: ' + (err.error?.message || 'Erreur sauvegarde'));
      },
    });
  }

  delete(course: any) {
    if (!confirm('Supprimer ce cours ?')) return;
    this.api.deleteCourse(course.id).subscribe({
      next: () => this.loadCourses(),
      error: () => alert('Erreur suppression'),
    });
  }

  publish(course: any) {
    const form = new FormData();
    form.append('status', 'PUBLISHED');
    this.api.updateCourse(course.id, form).subscribe({
      next: () => this.loadCourses(),
      error: () => alert('Erreur publication'),
    });
  }
}
