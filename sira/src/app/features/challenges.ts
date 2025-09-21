import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/api.service';

interface EventProposal {
  id: string;
  title: string;
  description: string;
  proposedDate: string;
  location: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  proposedBy?: {
    id: string;
    username: string;
    email: string;
  };
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-challenges',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './challenges.html',
  styleUrls: ['./challenges.scss']
})
export class ChallengesComponent implements OnInit {
  eventProposals: EventProposal[] = [];
  loading = false;
  currentFilter = 'all';
  selectedProposal: EventProposal | null = null;
  showDetailsDialog = false;
  showRejectDialog = false;
  rejectComment = '';
  proposalToReject: EventProposal | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadEventProposals();
  }

  loadEventProposals(): void {
    this.loading = true;
    
    if (this.currentFilter === 'pending') {
      this.apiService.getPendingEventProposals().subscribe({
        next: (response) => {
          // Fix: S'assurer que response.data est un tableau
          this.eventProposals = Array.isArray(response.data) ? response.data : [];
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading pending proposals:', error);
          this.eventProposals = [];
          this.loading = false;
        }
      });
    } else {
      this.apiService.getAllEventProposals().subscribe({
        next: (response) => {
          // Fix: S'assurer que response.data est un tableau
          this.eventProposals = Array.isArray(response.data) ? response.data : [];
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading proposals:', error);
          this.eventProposals = [];
          this.loading = false;
        }
      });
    }
  }

  openDetailsDialog(proposal: EventProposal): void {
    this.selectedProposal = proposal;
    this.showDetailsDialog = true;
  }

  closeDetailsDialog(): void {
    this.showDetailsDialog = false;
    this.selectedProposal = null;
  }

  openRejectDialog(proposal: EventProposal): void {
    this.proposalToReject = proposal;
    this.rejectComment = '';
    this.showRejectDialog = true;
  }

  closeRejectDialog(): void {
    this.showRejectDialog = false;
    this.proposalToReject = null;
    this.rejectComment = '';
  }

  confirmReject(): void {
    if (this.proposalToReject && this.rejectComment) {
      this.reviewProposal(this.proposalToReject.id, 'REJECT', this.rejectComment);
      this.closeRejectDialog();
    }
  }

  reviewProposal(proposalId: string, action: 'APPROVE' | 'REJECT', comment?: string): void {
    this.apiService.reviewEventProposal(proposalId, action, comment).subscribe({
      next: (response) => {
        alert(`Proposition ${action === 'APPROVE' ? 'approuvée' : 'rejetée'} avec succès`);
        this.loadEventProposals(); // Recharger la liste
        this.closeDetailsDialog(); // Fermer le dialog si ouvert
      },
      error: (error) => {
        console.error('Error reviewing proposal:', error);
        alert('Erreur lors du traitement de la proposition');
      }
    });
  }

  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'PENDING': 'En attente',
      'APPROVED': 'Approuvé',
      'REJECTED': 'Rejeté'
    };
    return statusLabels[status] || status;
  }

  // Pipe personnalisé pour tronquer le texte
  truncateText(text: string, limit: number): string {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
}