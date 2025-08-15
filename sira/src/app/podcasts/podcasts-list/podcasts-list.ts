import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Podcast {
  id: number;
  title: string;
  author: string;
  date: string;
  status: 'en attente' | 'validé' | 'rejeté';
}

@Component({
  selector: 'app-podcasts-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './podcasts-list.html',
  styleUrls: ['./podcasts-list.scss']
})
export class PodcastsList {
  podcasts: Podcast[] = [
    { id: 1, title: 'L’apprentissage collaboratif', author: 'Alice', date: '2025-02-01', status: 'en attente' },
    { id: 2, title: 'Comment réussir un projet tech', author: 'Bob', date: '2025-01-25', status: 'validé' },
    { id: 3, title: 'Leadership et innovation', author: 'Charlie', date: '2025-01-20', status: 'rejeté' },
  ];

  constructor(private router: Router) {}

  validatePodcast(id: number) {
    this.router.navigate([`/podcasts/validate/${id}`]);
  }
}
