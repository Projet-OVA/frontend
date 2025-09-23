import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ApiService } from '../../core/api.service';
import { Publication, PublicationType } from '../../core/models/publication';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './publications.html',
  styleUrls: ['./publications.scss'],
})
export class PublicationsComponent implements OnInit {
  publications: Publication[] = [];
  filteredPublications: Publication[] = [];

  loading = false;
  error = '';
  saving = false;
  showDialog = false;

  // form model
  newPub: {
    id: string | null;
    publicationContent: string;
    publicationType: PublicationType;
    status: string;
    mediaType: string;
    file: File | null;
    name?: string;
  } = this.resetModel();

  // filters / sorting
  selectedType: '' | PublicationType = '';
  sortOrder: 'desc' | 'asc' = 'desc';
  searchQ = '';

  // allowed extensions (from backend schema)
  private allowedExt = ['pdf', 'pptx', 'mp4', 'mp3', 'webp', 'png'];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  resetModel() {
    return {
      id: null,
      publicationContent: '',
      publicationType: 'TEXT' as PublicationType,
      status: 'DRAFT',
      mediaType: 'IMAGE',
      file: null,
      name: undefined,
    };
  }

  load() {
    this.loading = true;
    this.error = '';
    this.api
      .getPublications()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (list) => {
          // list items are Publication per ApiService parsing
          this.publications = (list || []) as Publication[];
          this.applyAllFilters();
        },
        error: (err) => {
          console.error(err);
          this.error =
            err?.error?.message || err?.message || 'Impossible de charger les publications';
        },
      });
  }

  openDialog(pub?: Publication) {
    if (pub) {
      this.newPub = {
        id: pub.id ?? null,
        publicationContent: pub.publicationContent ?? '',
        publicationType: (pub.publicationType as PublicationType) ?? 'TEXT',
        status: pub.status ?? 'DRAFT',
        mediaType: pub.attachment?.mediaType ?? 'IMAGE',
        file: null,
        name: pub.attachment?.name ?? undefined,
      };
    } else {
      this.newPub = this.resetModel();
    }
    this.showDialog = true;
  }

  onFileChange(e: any) {
    const f: File = e.target?.files?.[0];
    if (!f) return;
    const ext = (f.name.split('.').pop() || '').toLowerCase();
    if (!this.allowedExt.includes(ext)) {
      alert('Extension non supportée. Extensions acceptées: ' + this.allowedExt.join(', '));
      return;
    }
    this.newPub.file = f;
  }

  // generate a safe name if backend requires name
  private generateNameFromContent(content: string): string {
    if (!content) return `publication-${Date.now()}`;
    const s = content
      .trim()
      .slice(0, 60)
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '') // remove diacritics
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-_]/g, '')
      .toLowerCase();
    return s || `publication-${Date.now()}`;
  }

  save() {
    // minimal validation
    if (
      (this.newPub.publicationType === 'MEDIA' || this.newPub.publicationType === 'PODCAST') &&
      !this.newPub.file &&
      !this.newPub.id
    ) {
      alert('Un fichier est requis pour les publications media/podcast.');
      return;
    }

    this.saving = true;

    // ensure name exists (backend sample shows name field); we auto-generate if absent
    if (!this.newPub.name) {
      this.newPub.name = this.generateNameFromContent(this.newPub.publicationContent || '');
    }

    const form = new FormData();
    form.append('publicationContent', this.newPub.publicationContent ?? '');
    form.append('publicationType', this.newPub.publicationType ?? 'TEXT');
    form.append('status', this.newPub.status ?? 'DRAFT');
    form.append('name', this.newPub.name ?? '');
    form.append('mediaType', this.newPub.mediaType ?? 'IMAGE');
    if (this.newPub.file) form.append('file', this.newPub.file);

    const finished = () => {
      this.saving = false;
    };

    if (this.newPub.id) {
      // Try multipart PATCH (backend may accept). If fails, backend should accept JSON update.
      this.api
        .updatePublication(this.newPub.id, form)
        .pipe(finalize(finished))
        .subscribe({
          next: () => {
            this.showDialog = false;
            this.load();
          },
          error: (err) => {
            console.error(err);
            this.error = 'Erreur lors de la mise à jour';
          },
        });
    } else {
      this.api
        .createPublication(form)
        .pipe(finalize(finished))
        .subscribe({
          next: () => {
            this.showDialog = false;
            this.load();
          },
          error: (err) => {
            console.error(err);
            this.error = 'Erreur lors de la création';
          },
        });
    }
  }

  edit(pub: Publication) {
    this.openDialog(pub);
  }

  delete(pub: Publication) {
    if (!confirm('Supprimer cette publication ?')) return;
    const id = pub.id;
    if (!id) {
      alert('ID manquant');
      return;
    }
    this.api.deletePublication(id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.error(err);
        alert('Erreur suppression');
      },
    });
  }

  publish(pub: Publication) {
    const id = pub.id;
    if (!id) {
      alert('ID manquant');
      return;
    }
    this.api.publishPublication(id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la publication');
      },
    });
  }

  // FILTER / SORT / SEARCH
  applyAllFilters() {
    let out = [...this.publications];

    if (this.selectedType) {
      out = out.filter((p) => p.publicationType === this.selectedType);
    }

    if (this.searchQ) {
      const q = this.searchQ.toLowerCase();
      out = out.filter(
        (p) =>
          (p.publicationContent ?? '').toLowerCase().includes(q) ||
          (p.attachment?.name ?? '').toLowerCase().includes(q) ||
          (p.author?.nom ?? '').toLowerCase().includes(q) ||
          (p.author?.prenom ?? '').toLowerCase().includes(q)
      );
    }

    out.sort((a, b) => {
      const da = a.publicationDate ? new Date(a.publicationDate).getTime() : 0;
      const db = b.publicationDate ? new Date(b.publicationDate).getTime() : 0;
      return this.sortOrder === 'desc' ? db - da : da - db;
    });

    this.filteredPublications = out;
  }

  onFilterChange() {
    this.applyAllFilters();
  }

  onSortChange(order: 'desc' | 'asc') {
    this.sortOrder = order;
    this.applyAllFilters();
  }

  onSearchChange(q: string) {
    this.searchQ = q;
    this.applyAllFilters();
  }

  selectedPublication: any = null;
  showDetailsDialog = false;

  openDetails(pub: any) {
    this.selectedPublication = pub;
    this.showDetailsDialog = true;
  }
}
