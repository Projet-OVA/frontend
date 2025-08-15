import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-podcast-validate',
  templateUrl: './podcast-validate.html',
  styleUrls: ['./podcast-validate.scss']
})
export class PodcastValidate {
  podcastId: number;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.podcastId = Number(this.route.snapshot.paramMap.get('id'));
  }

  approvePodcast() {
    console.log(`Podcast ${this.podcastId} approuvé ✅`);
    // plus tard tu mettras un appel backend ici
  }

  rejectPodcast() {
    console.log(`Podcast ${this.podcastId} rejeté ❌`);
    // idem pour le back
  }

  goBack() {
    this.router.navigate(['/podcasts']);
  }
}
