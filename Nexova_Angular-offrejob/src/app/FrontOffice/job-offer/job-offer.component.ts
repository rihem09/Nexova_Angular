import { Component, OnInit } from '@angular/core';
import { JobOffer } from '../../models/job-offer.model';
import { JobOfferService } from '../../services/services/job-offer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.css']
})
export class JobOfferComponent implements OnInit {

  jobOffers: JobOffer[] = [];
  filteredOffers: JobOffer[] = [];
  newOffer: JobOffer = {
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    location: '',
    jobType: '',
    salary: 0,
    applicationDeadline: ''
  };

  selectedOffer: JobOffer | null = null;
  showModal = false;

  constructor(private jobOfferService: JobOfferService, private router: Router) {}

  ngOnInit(): void {
    this.loadJobOffers();
  }

  readMore(offer: JobOffer): void {
    this.selectedOffer = offer;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedOffer = null;
  }

  postuler(offerId: number): void {
    this.router.navigate(['/applications/create', offerId]);
  }

  loadJobOffers(): void {
    this.jobOfferService.getAllJobOffers().subscribe({
      next: (data) => {
        this.jobOffers = data;
        this.filteredOffers = data;
      },
      error: (err) => console.error(err)
    });
  }

  createJobOffer(): void {
    this.jobOfferService.createJobOffer(this.newOffer).subscribe({
      next: (created) => {
        this.jobOffers.push(created);
        this.filteredOffers.push(created);
        this.newOffer = {
          jobTitle: '',
          companyName: '',
          jobDescription: '',
          location: '',
          jobType: '',
          salary: 0,
          applicationDeadline: ''
        };
      },
      error: (err) => console.error(err)
    });
  }

  selectOfferForUpdate(offer: JobOffer): void {
    this.selectedOffer = { ...offer };
  }

  updateJobOffer(): void {
    if (this.selectedOffer && this.selectedOffer.id) {
      this.jobOfferService.updateJobOffer(this.selectedOffer.id, this.selectedOffer).subscribe({
        next: (updated) => {
          const index = this.jobOffers.findIndex(o => o.id === updated.id);
          if (index !== -1) {
            this.jobOffers[index] = updated;
            this.filteredOffers[index] = updated;
          }
          this.selectedOffer = null;
        },
        error: (err) => console.error(err)
      });
    }
  }

  deleteJobOffer(id: number): void {
    this.jobOfferService.deleteJobOffer(id).subscribe({
      next: () => {
        this.jobOffers = this.jobOffers.filter(o => o.id !== id);
        this.filteredOffers = this.filteredOffers.filter(o => o.id !== id);
      },
      error: (err) => console.error(err)
    });
  }

  // 🔍 IA filter
  applyAIFilter(criteria: { location?: string, domain?: string }): void {
    const location = criteria.location?.trim().toLowerCase() || '';
    const domain = criteria.domain?.trim().toLowerCase() || '';
  
    console.log('🧠 Critères IA :', location, domain);
    console.log('📦 Toutes les offres :', this.jobOffers);
  
    this.filteredOffers = this.jobOffers.filter(offer => {
      const offerLocation = offer.location?.toLowerCase() || '';
      const offerDescription = offer.jobDescription?.toLowerCase() || '';
      const offerTitle = offer.jobTitle?.toLowerCase() || '';
  
      const matchesLocation = !location || offerLocation.includes(location);
      const matchesDomain = !domain || offerDescription.includes(domain) || offerTitle.includes(domain);
      const result = matchesLocation && matchesDomain;
  
      console.log(' Offre : ${offer.jobTitle} | Match Loc: ${matchesLocation} | Match Dom: ${matchesDomain} | Résultat: ${result}');
      return result;
    });
  
    console.log('🎯 Offres filtrées :', this.filteredOffers);
  }
}