import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PodcastsService } from '../podcasts.services';

@Component({
  selector: 'app-podcast-validate',
  templateUrl: './podcast-validate.html',
  styleUrls: ['./podcast-validate.scss']
})
export class PodcastValidate {
  podcastId: number;
  podcast: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private podcastsService: PodcastsService
  ) {
    this.podcastId = Number(this.route.snapshot.paramMap.get('id'));
    this.podcast = this.podcastsService.getPodcastById(this.podcastId);
  }

  approvePodcast() {
    this.podcastsService.updateStatus(this.podcastId, 'validé');
    alert(`Podcast "${this.podcast.title}" approuvé ✅`);
    this.goBack();
  }

  rejectPodcast() {
    this.podcastsService.updateStatus(this.podcastId, 'rejeté');
    alert(`Podcast "${this.podcast.title}" rejeté ❌`);
    this.goBack();
  }

  goBack() {
    this.router.navigate(['/podcasts']);
  }
}
