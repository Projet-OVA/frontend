import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contents',
  imports: [CommonModule, FormsModule],
  templateUrl: './contents.html',
  styleUrls: ['./contents.scss'],
})
export class ContentsComponent implements OnInit {
  contents: any[] = [];
  loading = false;
  error = '';

  showDialog = false;
  saving = false;

  filterType: string = '';

  newContent: any = this.initContent();
  selectedFile: File | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadContents();
  }

  initContent() {
    // Dans initContent()
    return {
      title: '',
      description: '',
      contentType: 'COURSE',
      language: 'FR',
      duration: '0', // ← Essayez string au lieu de number
      status: 'DRAFT',
      creator: 'admin', // ← Valeur par défaut
      communityId: 'default', // ← Valeur par défaut
      attachment: null,
      // Ajoutez d'autres champs requis
    };
  }

  loadContents() {
    this.loading = true;

    Promise.all([this.api.getCourses().toPromise(), this.api.getEvents().toPromise()])
      .then(([courses, events]) => {
        const safeCourses = (courses ?? []) as any[];
        const safeEvents = (events ?? []) as any[];

        this.contents = [
          ...safeCourses.map((c) => ({ ...c, contentType: 'COURSE' })),
          ...safeEvents.map((e) => ({ ...e, contentType: 'EVENT' })),
        ];

        this.loading = false;
      })
      .catch((err) => {
        console.error(err);
        this.error = 'Erreur chargement';
        this.loading = false;
      });
  }

  openDialog(content: any = null) {
    this.newContent = content ? { ...content } : this.initContent();
    this.selectedFile = null;
    this.showDialog = true;
  }

  onFileChange(evt: any) {
    const f = evt.target.files?.[0];
    if (f) this.selectedFile = f;
  }

  save() {
    this.saving = true;
    const form = new FormData();
    Object.keys(this.newContent).forEach((k) => {
      if (k !== 'attachment') form.append(k, this.newContent[k]);
    });
    if (this.selectedFile) form.append('attachment', this.selectedFile);

    const contentType = this.newContent.contentType;
    const obs = this.newContent.id
      ? contentType === 'COURSE'
        ? this.api.updateCourse(this.newContent.id, form)
        : this.api.updateEvent(this.newContent.id, form)
      : contentType === 'COURSE'
      ? this.api.createCourse(form)
      : this.api.createEvent(form);

    obs.subscribe({
      next: () => {
        this.saving = false;
        this.showDialog = false;
        this.loadContents();
      },
      error: (err) => {
        console.error('Erreur détaillée:', err.error); // ← Ajoutez cette ligne
        this.saving = false;
        alert('Erreur enregistrement: ' + (err.error?.message || 'Données invalides'));
      },
    });
  }

  delete(c: any) {
    if (!confirm('Supprimer ?')) return;
    const deleteObs =
      c.contentType === 'COURSE' ? this.api.deleteCourse(c.id) : this.api.deleteEvent(c.id);

    deleteObs.subscribe({
      next: () => this.loadContents(),
      error: () => alert('Erreur suppression'),
    });
  }

  publish(c: any) {
    const form = new FormData();
    form.append('status', 'PUBLISHED');

    const publishObs =
      c.contentType === 'COURSE'
        ? this.api.updateCourse(c.id, form)
        : this.api.updateEvent(c.id, form);

    publishObs.subscribe({
      next: () => this.loadContents(),
      error: () => alert('Erreur publication'),
    });
  }
}
