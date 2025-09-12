import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Publication {
  id: number;
  title: string;
  type: 'article' | 'video' | 'podcast';
  createdAt: Date;
  author: string;
}

@Component({
  selector: 'app-publications',
  imports: [FormsModule, CommonModule],
  templateUrl: './publications.html',
  styleUrls: ['./publications.scss']
})
export class PublicationsComponent implements OnInit {

  publications: Publication[] = [];
  selectedType: string = 'all';

  ngOnInit(): void {
    // TODO: à remplacer plus tard par un appel à l'API backend
    this.publications = [
      { id: 1, title: 'Introduction à SIRA', type: 'article', createdAt: new Date(), author: 'Admin' },
      { id: 2, title: 'Podcast #1 : OVA', type: 'podcast', createdAt: new Date(), author: 'Admin' },
      { id: 3, title: 'Vidéo de présentation', type: 'video', createdAt: new Date(), author: 'Admin' },
    ];
  }

  filterByType(type: string) {
    this.selectedType = type;
  }

  get filteredPublications() {
    if (this.selectedType === 'all') return this.publications;
    return this.publications.filter(p => p.type === this.selectedType);
  }

  createPublication() {
    alert('Créer une nouvelle publication');
    // TODO: ouvrir un modal ou naviguer vers un formulaire de création
  }

  deletePublication(id: number) {
    if (confirm('Supprimer cette publication ?')) {
      this.publications = this.publications.filter(p => p.id !== id);
    }
  }
}
