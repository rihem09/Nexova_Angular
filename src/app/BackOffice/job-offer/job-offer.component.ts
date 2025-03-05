// // import { Component, OnInit } from '@angular/core';
// // import { Router } from '@angular/router';
// // import { JobOffer } from '../../models/job-offer.model';
// // import { JobOfferService } from '../../services/services/job-offer.service';
// // import { NgForm } from '@angular/forms';

// // @Component({
// //   selector: 'app-job-offer',
// //   templateUrl: './job-offer.component.html',
// //   styleUrls: ['./job-offer.component.css']
// // })
// // export class JobOfferComponent implements OnInit {

// //   jobOffers: JobOffer[] = [];
// //   newOffer: JobOffer = {
// //     jobTitle: '',
// //     companyName: '',
// //     jobDescription: '',
// //     location: '',
// //     jobType: '',
// //     salary: 0,
// //     applicationDeadline: ''
// //   };

// //   selectedOffer: JobOffer | null = null; // For updating an offer

// //   constructor(
// //     private jobOfferService: JobOfferService,
// //     private router: Router
// //   ) {}

// //   ngOnInit(): void {
// //     this.loadJobOffers();
// //   }

// //   loadJobOffers(): void {
// //     this.jobOfferService.getAllJobOffers().subscribe({
// //       next: (data) => this.jobOffers = data,
// //       error: (err) => console.error(err)
// //     });
// //   }

// //   // Called when the create form is submitted
// //   onCreate(form: NgForm): void {
// //     if (form.invalid) {
// //       return;
// //     }
// //     this.jobOfferService.createJobOffer(this.newOffer).subscribe({
// //       next: (created) => {
// //         this.jobOffers.push(created);
// //         form.resetForm();
// //       },
// //       error: (err) => console.error(err)
// //     });
// //   }

// //   // Called when the update form is submitted
// //   onUpdate(form: NgForm): void {
// //     if (form.invalid || !this.selectedOffer || !this.selectedOffer.id) {
// //       return;
// //     }
// //     this.jobOfferService.updateJobOffer(this.selectedOffer.id, this.selectedOffer).subscribe({
// //       next: (updated) => {
// //         const index = this.jobOffers.findIndex(o => o.id === updated.id);
// //         if (index !== -1) {
// //           this.jobOffers[index] = updated;
// //         }
// //         this.selectedOffer = null;
// //         form.resetForm();
// //       },
// //       error: (err) => console.error(err)
// //     });
// //   }

// //   selectOfferForUpdate(offer: JobOffer): void {
// //     this.selectedOffer = { ...offer };
// //   }

// //   deleteJobOffer(id: number): void {
// //     this.jobOfferService.deleteJobOffer(id).subscribe({
// //       next: () => {
// //         this.jobOffers = this.jobOffers.filter(o => o.id !== id);
// //       },
// //       error: (err) => console.error(err)
// //     });
// //   }
// // }
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { JobOffer } from '../../models/job-offer.model';
// import { JobOfferService } from '../../services/services/job-offer.service';
// import { NgForm } from '@angular/forms';

// @Component({
//   selector: 'app-job-offer',
//   templateUrl: './job-offer.component.html',
//   styleUrls: ['./job-offer.component.css']
// })
// export class JobOfferComponent implements OnInit {

//   jobOffers: JobOffer[] = [];
//   newOffer: JobOffer = {
//     jobTitle: '',
//     companyName: '',
//     jobDescription: '',
//     location: '',
//     jobType: '',
//     salary: 0,
//     applicationDeadline: ''
//   };

//   selectedOffer: JobOffer | null = null; // For updating an offer

//   // Pagination properties
//   currentPage: number = 1;
//   pageSize: number = 2; // Number of offers per page
//   totalPages: number = 1;
//   minDate: string = '';

//   constructor(
//     private jobOfferService: JobOfferService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.minDate = new Date().toISOString().split('T')[0];

//     this.loadJobOffers();
//   }

//   loadJobOffers(): void {
//     this.jobOfferService.getAllJobOffers().subscribe({
//       next: (data) => {
//         this.jobOffers = data;
//         this.totalPages = Math.ceil(this.jobOffers.length / this.pageSize);
//       },
//       error: (err) => console.error(err)
//     });
//   }

//   // Getter for paginated job offers
//   get paginatedJobOffers(): JobOffer[] {
//     const start = (this.currentPage - 1) * this.pageSize;
//     return this.jobOffers.slice(start, start + this.pageSize);
//   }

//   previousPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//     }
//   }

//   nextPage(): void {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//     }
//   }

//   // Called when the create form is submitted
//   onCreate(form: NgForm): void {
//     if (form.invalid) {
//       return;
//     }
//     this.jobOfferService.createJobOffer(this.newOffer).subscribe({
//       next: (created) => {
//         this.jobOffers.push(created);
//         // Update totalPages after adding a new offer
//         this.totalPages = Math.ceil(this.jobOffers.length / this.pageSize);
//         form.resetForm();
//       },
//       error: (err) => console.error(err)
//     });
//   }

//   // Called when the update form is submitted
//   onUpdate(form: NgForm): void {
//     if (form.invalid || !this.selectedOffer || !this.selectedOffer.id) {
//       return;
//     }
//     this.jobOfferService.updateJobOffer(this.selectedOffer.id, this.selectedOffer).subscribe({
//       next: (updated) => {
//         const index = this.jobOffers.findIndex(o => o.id === updated.id);
//         if (index !== -1) {
//           this.jobOffers[index] = updated;
//         }
//         this.selectedOffer = null;
//         form.resetForm();
//       },
//       error: (err) => console.error(err)
//     });
//   }

//   selectOfferForUpdate(offer: JobOffer): void {
//     this.selectedOffer = { ...offer };
//   }

//   deleteJobOffer(id: number): void {
//     this.jobOfferService.deleteJobOffer(id).subscribe({
//       next: () => {
//         this.jobOffers = this.jobOffers.filter(o => o.id !== id);
//         // Recompute totalPages after deletion
//         this.totalPages = Math.ceil(this.jobOffers.length / this.pageSize);
//       },
//       error: (err) => console.error(err)
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobOffer } from '../../models/job-offer.model';
import { JobOfferService } from '../../services/services/job-offer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.css']
})
export class JobOfferComponent implements OnInit {

  jobOffers: JobOffer[] = [];
  filteredJobOffers: JobOffer[] = [];
  searchTerm: string = '';
  minDate: string = '';
  newOffer: JobOffer = {
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    location: '',
    jobType: '',
    salary: 0,
    applicationDeadline: ''
  };

  selectedOffer: JobOffer | null = null; // For updating an offer

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 3; // Number of offers per page
  totalPages: number = 1;

  constructor(
    private jobOfferService: JobOfferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.minDate = new Date().toISOString().split('T')[0];
    this.loadJobOffers();
  }

  loadJobOffers(): void {
    this.jobOfferService.getAllJobOffers().subscribe({
      next: (data) => {
        this.jobOffers = data;
        this.filteredJobOffers = data;
        this.totalPages = Math.ceil(this.jobOffers.length / this.pageSize);
      },
      error: (err) => console.error(err)
    });
  }

  // Filter job offers based on the search term (by job title or company name)
  filterJobOffers(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (term === '') {
      this.filteredJobOffers = [...this.jobOffers];
    } else {
      this.filteredJobOffers = this.jobOffers.filter(offer =>
        offer.jobTitle.toLowerCase().includes(term) ||
        offer.companyName.toLowerCase().includes(term)
      );
    }
    // Update pagination
    this.totalPages = Math.ceil(this.filteredJobOffers.length / this.pageSize);
    this.currentPage = 1; // Reset to first page when filtering
  }

  // Getter for paginated job offers
  get paginatedJobOffers(): JobOffer[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredJobOffers.slice(start, start + this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Called when the create form is submitted
  onCreate(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.jobOfferService.createJobOffer(this.newOffer).subscribe({
      next: (created) => {
        this.jobOffers.push(created);
        // Update filtered list and pagination after adding a new offer
        this.filterJobOffers();
        form.resetForm();
      },
      error: (err) => console.error(err)
    });
  }

  // Called when the update form is submitted
  onUpdate(form: NgForm): void {
    if (form.invalid || !this.selectedOffer || !this.selectedOffer.id) {
      return;
    }
    this.jobOfferService.updateJobOffer(this.selectedOffer.id, this.selectedOffer).subscribe({
      next: (updated) => {
        const index = this.jobOffers.findIndex(o => o.id === updated.id);
        if (index !== -1) {
          this.jobOffers[index] = updated;
        }
        this.selectedOffer = null;
        form.resetForm();
        this.filterJobOffers();
      },
      error: (err) => console.error(err)
    });
  }

  selectOfferForUpdate(offer: JobOffer): void {
    this.selectedOffer = { ...offer };
  }

  deleteJobOffer(id: number): void {
    this.jobOfferService.deleteJobOffer(id).subscribe({
      next: () => {
        this.jobOffers = this.jobOffers.filter(o => o.id !== id);
        this.filterJobOffers();
      },
      error: (err) => console.error(err)
    });
  }
}
