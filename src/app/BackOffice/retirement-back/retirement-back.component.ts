import { Component, OnInit } from '@angular/core';
import { RetirementService } from '../../services/retirement.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-retirement-back',
  templateUrl: './retirement-back.component.html',
  styleUrls: ['./retirement-back.component.css']
})
export class RetirementBackComponent implements OnInit {
  retraites: any[] = [];
  searchText: any;
  selectedRetraite: any = null; // Pour stocker les détails de la retraite sélectionnée

  constructor(private retirementService: RetirementService) {}

  ngOnInit(): void {
    this.loadRetraites();
  }

  loadRetraites(): void {
    this.retirementService.getRetraites().subscribe(
      (data) => {
        this.retraites = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des retraites', error);
      }
    );
  }
  generatePDF() {
    const doc = new jsPDF();
    
    doc.text('Liste des Retraites', 10, 10);

    autoTable(doc, {
      head: [['ID', 'Âge Début', 'Âge Fin', 'Bénéficiaire', 'Date Inscription', 'Montant']],
      body: this.retraites.map(r => [r.id, r.age_debut_versement, r.age_fin_versement, r.beneficiaire, r.date_inscri, r.montant_coti])
    });

    doc.save('Liste_Retraites.pdf');
  }
  
  deleteRetraite(id: number): void {
    this.retirementService.deleteRetraite(id).subscribe(
      () => {
        console.log(`Retraite avec ID ${id} supprimée`);
        this.loadRetraites(); // Rechargez la liste après suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression de la retraite', error);
      }
    );
  }
 
  
  editRetraite(id: number): void {
    this.selectedRetraite = this.retraites.find(retraite => retraite.id === id);
  }

  updateRetraite(updatedDetails: any): void {
    if (this.selectedRetraite) {
      this.retirementService.updateRetraite(this.selectedRetraite.id, updatedDetails).subscribe(
        (updatedRetraite) => {
          console.log('Retraite mise à jour', updatedRetraite);
          this.loadRetraites(); // Rechargez la liste après mise à jour
          this.selectedRetraite = null; // Réinitialisez la retraite sélectionnée
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la retraite', error);
        }
      );
    }
  }
}