import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contents.html',
  styleUrls: ['./contents.scss'],
})
export class ContentsComponent implements OnInit {
  tab = 'parcours';
  q = '';
  contents: any[] = [];
  filteredContents: any[] = [];

  showDialog = false;
  editContent: any = null;

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.contents = [
      { id: 1, title: 'Set Settal', type: 'parcours', language: 'fr', duration: 45, status: 'Publié' },
      { id: 2, title: 'Match mariés vs célibataires', type: 'defis', language: 'fr', duration: 15, status: 'En attente' },
    ];
    this.applyFilters();
  }

  applyFilters() {
    this.filteredContents = this.contents.filter(c =>
      (this.tab ? c.type === this.tab : true) &&
      (this.q ? c.title.toLowerCase().includes(this.q.toLowerCase()) : true)
    );
  }

  openDialog(content?: any) {
    this.editContent = content
      ? { ...content }
      : { title: '', type: 'parcours', language: 'fr', duration: 0, status: 'En attente' };
    this.showDialog = true;
  }

  saveDialog() {
    if (this.editContent.id) {
      const idx = this.contents.findIndex(c => c.id === this.editContent.id);
      this.contents[idx] = this.editContent;
    } else {
      this.editContent.id = Date.now();
      this.contents.push(this.editContent);
    }
    this.showDialog = false;
    this.applyFilters();
  }

  delete(id: number) {
    if (confirm('Supprimer ce contenu ?')) {
      this.contents = this.contents.filter(c => c.id !== id);
      this.applyFilters();
    }
  }

  changeStatus(id: number, newStatus: string) {
    const content = this.contents.find(c => c.id === id);
    if (content) {
      content.status = newStatus;
      this.applyFilters();
    }
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
