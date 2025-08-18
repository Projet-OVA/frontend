import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PodcastsService } from '../podcasts.services';

@Component({
  selector: 'app-podcasts-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './podcasts-list.html',
  styleUrls: ['./podcasts-list.scss']
})
export class PodcastsList implements OnInit {
  podcasts: any[] = [];

  constructor(private router: Router, private podcastsService: PodcastsService) {}

  ngOnInit(): void {
    this.podcasts = this.podcastsService.getPodcasts();
  }

  validatePodcast(id: number) {
    this.router.navigate([`/podcasts/validate/${id}`]);
  }
}
