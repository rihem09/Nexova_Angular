import { Component } from '@angular/core';
import { RetirementService } from '../../services/retirement.service';

@Component({
  selector: 'app-retirement',
  templateUrl: './retirement.component.html',
  styleUrls: ['./retirement.component.css']
})
export class RetirementComponent {
  retraite = {
    dateInscri: '',
    montantCoti: 0,
    ageDebutVersement: 0,
    ageFinVersement: 0,
    beneficiaire: ''
  };

  constructor(private retirementService: RetirementService) {}

  onSubmit() {
    this.retirementService.addRetraite(this.retraite).subscribe(
      response => {
        console.log('Retraite ajoutée avec succès!', response);
        alert('Inscription réussie!');
      },
      error => {
        console.error('Erreur lors de l\'inscription', error);
        alert('Erreur lors de l\'inscription');
      }
    );
  }
  
}
