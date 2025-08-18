import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reports-export',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports-export.html',
  styleUrls: ['./reports-export.scss'],
})
export class ReportsExport {
  pageTitle = 'Export des rapports';
  reports = [
    { id: 1, name: 'Utilisateurs' },
    { id: 2, name: 'Challenges' },
    { id: 3, name: 'Badges' },
    { id: 4, name: 'Feedback' },
  ];

  exportCSV(reportId: number) {
    fetch(`http://localhost:3000/api/reports/${reportId}/csv`)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report-${reportId}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => console.error('Erreur export CSV', err));
  }

  exportPDF(reportId: number) {
    fetch(`http://localhost:3000/api/reports/${reportId}/pdf`)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du téléchargement PDF');
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report-${reportId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => console.error('Erreur export PDF', err));
  }
}
