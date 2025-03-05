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
  newOffer: JobOffer = {
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    location: '',
    jobType: '',
    salary: 0,
    applicationDeadline: ''
  };
  
  selectedOffer: JobOffer | null = null; // Pour le update
  showModal = false;

  constructor(private jobOfferService: JobOfferService,private router: Router) {}

  ngOnInit(): void {
    this.loadJobOffers();
  }
  readMore(offer: JobOffer): void {
    // Set selectedOffer and show the modal
    this.selectedOffer = offer;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedOffer = null;
  }
  postuler(offerId: number) {
    // e.g., navigate to /applications/create/123
    this.router.navigate(['/applications/create', offerId]);
  }
  loadJobOffers(): void {
    this.jobOfferService.getAllJobOffers().subscribe({
      next: (data) => this.jobOffers = data,
      error: (err) => console.error(err)
    });
  }

  createJobOffer(): void {
    this.jobOfferService.createJobOffer(this.newOffer).subscribe({
      next: (created) => {
        this.jobOffers.push(created);
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
    this.selectedOffer = { ...offer }; // clone l'objet pour éviter la mutation
  }

  updateJobOffer(): void {
    if (this.selectedOffer && this.selectedOffer.id) {
      this.jobOfferService.updateJobOffer(this.selectedOffer.id, this.selectedOffer).subscribe({
        next: (updated) => {
          // Mettre à jour la liste localement
          const index = this.jobOffers.findIndex(o => o.id === updated.id);
          if (index !== -1) {
            this.jobOffers[index] = updated;
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
      },
      error: (err) => console.error(err)
    });
  }
}
