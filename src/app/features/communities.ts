import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-communities',
  imports: [CommonModule, FormsModule],
  templateUrl: './communities.html',
  styleUrls: ['./communities.scss'],
})
export class CommunitiesComponent implements OnInit {
  communities: any[] = [];
  loading = false;

  showDialog = false;
  saving = false;
  selectedCommunity: any = { communityName: '', communityCategory: '' };

  categories = ['ENVIRONNEMENT', 'EDUCATION', 'sANTE', 'CULTURE', 'SPORT', 'AUTRE'];


  constructor(private api: ApiService, private authService: AuthService) {}

  ngOnInit() {
    this.loadCommunities();
  }

  // Charger toutes les communautés
  loadCommunities() {
    this.loading = true;
    this.api.getCommunities().subscribe({
      next: (res: any) => {
        this.communities = res.data; // s'assurer de prendre res.data
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des communautés', err);
        this.loading = false;
      },
    });
  }

  // Ouvrir la fenêtre de création ou édition
  openDialog(community?: any) {
    this.selectedCommunity = community
      ? { ...community }
      : { communityName: '', communityCategory: '' };
    this.showDialog = true;
  }

  // Sauvegarder une nouvelle communauté ou modifier existante
  saveCommunity() {
    if (!this.selectedCommunity.communityName || !this.selectedCommunity.communityCategory) {
      alert('Nom et catégorie obligatoires');
      return;
    }

    const payload = {
      communityName: this.selectedCommunity.communityName,
      communityCategory: this.selectedCommunity.communityCategory,
      creatorId: this.authService.getUserId(),
    };

    console.log('Payload envoyé au serveur:', payload);

    this.saving = true;
    this.api.createCommunity(payload).subscribe({
      next: (res) => {
        console.log('Réponse serveur:', res);
        alert('Communauté créée avec succès !');
        this.showDialog = false;
        this.saving = false;
        this.loadCommunities();
      },
      error: (err) => {
        console.error('Erreur lors de la sauvegarde', err);
        alert('Erreur lors de la sauvegarde : ' + JSON.stringify(err.error));
        this.saving = false;
      },
    });
  }

  // Supprimer une communauté
  deleteCommunity(community: any) {
    if (!confirm('Supprimer cette communauté ?')) return;

    this.api.deleteCommunity(community.id).subscribe({
      next: () => this.loadCommunities(),
      error: (err) => console.error('Erreur lors de la suppression', err),
    });
  }
}
