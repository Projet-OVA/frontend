import { Injectable } from '@angular/core';

interface Podcast {
  id: number;
  title: string;
  author: string;
  date: string;
  status: 'en attente' | 'validé' | 'rejeté';
}

@Injectable({ providedIn: 'root' })
export class PodcastsService {
  private podcasts: Podcast[] = [
    { id: 1, title: 'L’apprentissage collaboratif', author: 'Alice', date: '2025-02-01', status: 'en attente' },
    { id: 2, title: 'Comment réussir un projet tech', author: 'Bob', date: '2025-01-25', status: 'validé' },
    { id: 3, title: 'Leadership et innovation', author: 'Charlie', date: '2025-01-20', status: 'rejeté' },
  ];

  getPodcasts() {
    return this.podcasts;
  }

  getPodcastById(id: number) {
    return this.podcasts.find(p => p.id === id);
  }

  updateStatus(id: number, status: 'validé' | 'rejeté') {
    const podcast = this.getPodcastById(id);
    if (podcast) {
      podcast.status = status;
    }
  }
}
