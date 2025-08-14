import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Badge {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class BadgeService {
  private badges: Badge[] = [
    { id: 1, name: 'Badge 1', description: 'Description du badge 1' },
    { id: 2, name: 'Badge 2', description: 'Description du badge 2' },
    { id: 3, name: 'Badge 3', description: 'Description du badge 3' },
  ];

  constructor() {}

  getBadges(): Observable<Badge[]> {
    return of(this.badges);
  }

  getBadge(id: number): Observable<Badge | undefined> {
    return of(this.badges.find(b => b.id === id));
  }

  createBadge(badge: Badge): void {
    badge.id = this.badges.length + 1;
    this.badges.push(badge);
  }

  updateBadge(updatedBadge: Badge): void {
    const index = this.badges.findIndex(b => b.id === updatedBadge.id);
    if (index !== -1) {
      this.badges[index] = updatedBadge;
    }
  }

  deleteBadge(id: number): void {
    this.badges = this.badges.filter(b => b.id !== id);
  }
}
