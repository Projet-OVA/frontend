import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-badges',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './badges.html',
  styleUrls: ['./badges.scss'],
})
export class BadgesComponent implements OnInit {
  badges: any[] = [];

  ngOnInit(): void {
    // TODO: appeler API Nest pour récupérer les badges
    this.badges = [
      {
        id: 1,
        key: 'Ndorte',
        title: 'Premier pas',
        description: 'Profil complété',
        icon: '🚀', // ou classe CSS
      },
      {
        id: 2,
        key: 'Djed',
        title: 'Stabilité',
        description: 'Progression ≥ 50%',
        icon: '🏛️',
      },
      {
        id: 3,
        key: 'Ankh',
        title: 'Accomplissement',
        description: 'Parcours terminé à 100%',
        icon: '☥',
      },
      {
        id: 4,
        key: 'Lamaan',
        title: 'Communauté',
        description: "Lancement d'un défi",
        icon: '👥',
      },
    ];
  }

  assign(userId: string, badgeId: number) {}
  create() {}
}




// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ApiService } from '../core/api.service';

// @Component({
//   selector: 'app-badges',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './badges.html',
//   styleUrls: ['./badges.scss']
// })
// export class BadgesComponent implements OnInit {
//   badges: any[] = [];

//   constructor(private api: ApiService) {}

//   ngOnInit() {
//     this.loadBadges();
//   }

//   loadBadges() {
//     // TODO: Remplacer 'badges' par ton endpoint Nest
//     this.api.get<any[]>('badges').subscribe(data => {
//       this.badges = data;
//     });
//   }
// }
