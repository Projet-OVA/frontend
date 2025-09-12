import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-contents',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './contents.html',
  styleUrls: ['./contents.scss'],
})
export class ContentsComponent implements OnInit {
  tab = 'parcours'; // ← Ajouter
  q = ''; // ← Ajouter
  contents: any[] = [];

  // constructor(private api: ApiService) {}

  ngOnInit(): void {
    // TODO: appeler API Nest pour récupérer les contenus
    this.contents = [
      { id: 1, title: 'Set Settal', status: 'publié' },
      { id: 2, title: 'Match mariés vs célibataires', status: 'brouillon' },
    ];
  }

  load() {} // ← Ajouter
  edit(id?: number) {} // ← Ajouter
  delete(id: number) {} // ← Ajouter
  publishContent(id: number) {
    // TODO: appeler API Nest pour publier un contenu
    console.log('Publication contenu', id);
  }
}



// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ApiService } from '../core/api.service';

// @Component({
//   selector: 'app-contents',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './contents.html',
//   styleUrls: ['./contents.scss']
// })
// export class ContentsComponent implements OnInit {
//   contents: any[] = [];

//   constructor(private api: ApiService) {}

//   ngOnInit() {
//     this.loadContents();
//   }

//   loadContents() {
//     // TODO: Remplacer 'contents' par ton endpoint Nest
//     this.api.get<any[]>('contents').subscribe(data => {
//       this.contents = data;
//     });
//   }
// }
