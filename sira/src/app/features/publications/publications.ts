import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publications.html',
  styleUrls: ['./publications.scss'],
})
export class PublicationsComponent implements OnInit {
  publications: any[] = [];
  loading = false;
  error = '';

  showDialog = false;
  saving = false;

  // modèle du formulaire (utilisé pour créer / éditer)
  newPub: any = {
    id: null,
    publicationContent: '',
    publicationType: 'TEXT', // TEXT | MEDIA | PODCAST
    status: 'DRAFT',         // DRAFT | PUBLISHED | SUSPENDED (selon ton backend)
    name: '',
    mediaType: 'IMAGE',      // IMAGE | VIDEO | AUDIO
    file: null
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = '';
    this.api.getPublications()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (list) => {
          this.publications = list || [];
        },
        error: (err) => {
          console.error(err);
          this.error = err?.error?.message || err?.message || 'Impossible de charger les publications';
        }
      });
  }

  openDialog(pub?: any) {
    if (pub) {
      // Prépare la copie pour édition (évite mutation directe)
      this.newPub = {
        id: pub.id ?? pub._id ?? null,
        publicationContent: pub.publicationContent ?? '',
        publicationType: pub.publicationType ?? 'TEXT',
        status: pub.status ?? 'DRAFT',
        name: pub.name ?? '',
        mediaType: pub.attachment?.mediaType ?? pub.mediaType ?? 'IMAGE',
        file: null
      };
    } else {
      this.newPub = {
        id: null,
        publicationContent: '',
        publicationType: 'TEXT',
        status: 'DRAFT',
        name: '',
        mediaType: 'IMAGE',
        file: null
      };
    }
    this.showDialog = true;
  }

  onFileChange(event: any) {
    const f = event.target?.files?.[0];
    if (f) this.newPub.file = f;
  }

  save() {
    // validation minimale
    if (!this.newPub.name) {
      alert('Le champ "Nom" est obligatoire.');
      return;
    }
    // si MEDIA/PODCAST, require file
    if ((this.newPub.publicationType === 'MEDIA' || this.newPub.publicationType === 'PODCAST') && !this.newPub.file && !this.newPub.id) {
      alert('Un fichier est requis pour les publications media/podcast.');
      return;
    }

    this.saving = true;
    const form = new FormData();
    form.append('publicationContent', this.newPub.publicationContent ?? '');
    form.append('publicationType', this.newPub.publicationType ?? 'TEXT');
    form.append('status', this.newPub.status ?? 'DRAFT');
    form.append('name', this.newPub.name ?? '');
    form.append('mediaType', this.newPub.mediaType ?? 'IMAGE');
    if (this.newPub.file) form.append('file', this.newPub.file);

    if (this.newPub.id) {
      // update (si ton backend supporte multipart PATCH)
      this.api.updatePublication(this.newPub.id, form)
        .pipe(finalize(() => (this.saving = false)))
        .subscribe({
          next: () => { this.showDialog = false; this.load(); },
          error: (err) => {
            console.error(err);
            this.error = 'Erreur lors de la mise à jour';
          }
        });
    } else {
      // création
      this.api.createPublication(form)
        .pipe(finalize(() => (this.saving = false)))
        .subscribe({
          next: () => { this.showDialog = false; this.load(); },
          error: (err) => {
            console.error(err);
            this.error = 'Erreur lors de la création';
          }
        });
    }
  }

  edit(pub: any) {
    this.openDialog(pub);
  }

  delete(pub: any) {
    if (!confirm('Supprimer cette publication ?')) return;
    const id = pub.id ?? pub._id;
    if (!id) { alert('ID manquant'); return; }

    this.api.deletePublication(id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.error(err);
        alert('Erreur suppression');
      }
    });
  }

  publish(pub: any) {
    const id = pub.id ?? pub._id;
    if (!id) { alert('ID manquant'); return; }
    this.api.publishPublication(id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la publication');
      }
    });
  }
}
