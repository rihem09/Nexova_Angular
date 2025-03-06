import { Component } from '@angular/core';

@Component({
  selector: 'app-calculateur',
  templateUrl: './calculateur.component.html',
  styleUrls: ['./calculateur.component.css']
})
export class CalculateurComponent {
  montantCoti: number = 0;
  ageDebutVersement: number = 0;
  ageFinVersement: number = 0;
  tableauResultats: any[] = [];

  calculerEvolution() {
    this.tableauResultats = []; // Réinitialisation du tableau
    let cumulPrimes = 0;
// Calculer l'âge maximum
const age = this.ageFinVersement - this.ageDebutVersement
    for (let annee = 1, age = this.ageDebutVersement; age <= this.ageFinVersement; annee++, age++) {
      let primeAnnuelle = this.montantCoti * 0.03;
      cumulPrimes += this.montantCoti + (annee > 1 ? this.tableauResultats[annee - 2].primeAnnuelle : 0);
      let capitalDeces = this.montantCoti * 30;
      let capitalDecesAccident = capitalDeces * 2;

      this.tableauResultats.push({
        annee,
        age,
        primeAnnuelle: primeAnnuelle.toFixed(2),
        cumulPrimes: cumulPrimes.toFixed(2),
        capitalDeces: capitalDeces.toFixed(2),
        capitalDecesAccident: capitalDecesAccident.toFixed(2),
      });
    }
  }

}
