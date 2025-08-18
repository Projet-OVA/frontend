import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-educational-detail',
  templateUrl: './educational-detail.html',
  styleUrls: ['./educational-detail.scss']
})
export class EducationalDetail {
  id!: string;
  educational: any;

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id')!;
    // Contenu statique pour l’instant
    this.educational = {
      id: this.id,
      title: 'Parcours Développement Web',
      description: 'Un parcours complet pour apprendre Angular, Node.js et MongoDB.',
      duration: '12 semaines'
    };
  }
}
