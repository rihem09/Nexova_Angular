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

  dateErreur: boolean = false;
  formValide: boolean = false;
  calculsAffiches = false;
  primeAnnuelle = 0;
  capitalDecesToutesCauses = 0;
  capitalDecesAccident = 0;
  cumulPrimes: number[] = [];

  constructor(private retirementService: RetirementService) {}

  calculer() {
    let montant = this.retraite.montantCoti;

    // Vérification du montant valide
    if (!montant || montant <= 0) {
        alert("Veuillez entrer un montant de cotisation valide.");
        return;
    }

    // Initialisation des valeurs
    this.cumulPrimes = [];
    let cumul = montant; // Premier montant de cotisation

    for (let i = this.retraite.ageDebutVersement; i <= this.retraite.ageFinVersement; i++) {
        this.cumulPrimes.push(cumul);

        // Calcul de la prime annuelle sur la base de l'année précédente
        let primeAnnuelle = cumul * 0.03;

        // Mise à jour du cumul pour l'année suivante : 
        // Nouveau cumul = Cotisation initiale + Cumul de l'année précédente + Prime annuelle
        cumul = montant + cumul + primeAnnuelle;
    }

    // Calculs de capital
    this.capitalDecesToutesCauses = montant * 30;
    this.capitalDecesAccident = this.capitalDecesToutesCauses * 2;

    // Afficher les résultats
    this.calculsAffiches = true;
}

  // Vérifier si la date d'inscription est aujourd'hui
  verifierDate() {
    const today = new Date().toISOString().split('T')[0]; // Date d'aujourd'hui au format YYYY-MM-DD
    this.dateErreur = this.retraite.dateInscri !== today;
    this.verifierFormulaire();
  }

  // Vérifier la validité du formulaire
  verifierFormulaire() {
    this.formValide =
      !this.dateErreur &&
      this.retraite.montantCoti >= 0 &&
      this.retraite.ageDebutVersement >= 18 &&
      this.retraite.ageDebutVersement <= 70 &&
      this.retraite.ageFinVersement > this.retraite.ageDebutVersement &&
      this.retraite.ageFinVersement <= 80 &&
      /^[a-zA-Z ]+$/.test(this.retraite.beneficiaire);
  }

  // Soumission du formulaire
  onSubmit() {
    if (!this.formValide) {
      alert("Veuillez corriger les erreurs avant de soumettre.");
      return;
    }

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
