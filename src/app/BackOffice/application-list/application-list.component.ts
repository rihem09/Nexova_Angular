// import { Component, OnInit } from '@angular/core';
// import { Application } from '../../models/application.model';
// import { ApplicationService } from '../../services/services/application.service';
// import { JobOffer } from 'src/app/models/job-offer.model';
// import { JobOfferService } from 'src/app/services/services/job-offer.service';

// @Component({
//   selector: 'app-application-list',
//   templateUrl: './application-list.component.html',
//   styleUrls: ['./application-list.component.css']
// })
// export class ApplicationListComponent implements OnInit {

//   applications: Application[] = [];
//   newApp: Application = {
//     coverLetter: '',
//     resume: '',
//     applicationDate: '',
//     interviewSchedule: ''
//   };
//   selectedApp: Application | null = null;
//   jobOfferIdForNewApp: number | null = null; // ID de l'offre à laquelle on postule
//   jobOffers: JobOffer[] = [];

//   // Pagination properties
//   public p: number = 1;
//   public itemsPerPage: number = 5;

//   constructor(
//     private applicationService: ApplicationService,
//     private jobOfferService: JobOfferService
//   ) { }

//   ngOnInit(): void {
//     this.loadApplications();
//     this.loadJobOffers();
//   }

//   loadApplications(): void {
//     this.applicationService.getAllApplications().subscribe({
//       next: (data) => this.applications = data,
//       error: (err) => console.error(err)
//     });
//   }

//   loadJobOffers(): void {
//     this.jobOfferService.getAllJobOffers().subscribe({
//       next: (data) => this.jobOffers = data,
//       error: (err) => console.error(err)
//     });
//   }

//   createApplication(): void {
//     if (this.jobOfferIdForNewApp) {
//       this.applicationService.createApplication(this.newApp, this.jobOfferIdForNewApp).subscribe({
//         next: (created) => {
//           this.applications.push(created);
//           this.newApp = {
//             coverLetter: '',
//             resume: '',
//             applicationDate: '',
//             interviewSchedule: ''
//           };
//           this.jobOfferIdForNewApp = null;
//         },
//         error: (err) => console.error(err)
//       });
//     } else {
//       alert('Veuillez spécifier un jobOfferId');
//     }
//   }

//   selectAppForUpdate(app: Application): void {
//     this.selectedApp = { ...app };
//   }

//   updateApplication(): void {
//     if (this.selectedApp && this.selectedApp.id) {
//       this.applicationService.updateApplication(this.selectedApp.id, this.selectedApp).subscribe({
//         next: (updated) => {
//           const index = this.applications.findIndex(a => a.id === updated.id);
//           if (index !== -1) {
//             this.applications[index] = updated;
//           }
//           this.selectedApp = null;
//         },
//         error: (err) => console.error(err)
//       });
//     }
//   }

//   deleteApplication(id: number): void {
//     this.applicationService.deleteApplication(id).subscribe({
//       next: () => {
//         this.applications = this.applications.filter(a => a.id !== id);
//       },
//       error: (err) => console.error(err)
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/models/job-offer.model';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/services/application.service';
import { JobOfferService } from '../../services/services/job-offer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {

  applications: Application[] = [];
  newApp: Application = {
    coverLetter: '',
    resume: '',
    applicationDate: '',
    interviewSchedule: ''
  };
  selectedApp: Application | null = null; // For updating an application
  jobOfferIdForNewApp: number | null = null; // ID de l'offre à laquelle on postule
  jobOffers: JobOffer[] = [];
  selectedJobOffer: JobOffer | null = null;   // For viewing related job offer details
  selectedApplication: any = null; 

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(
    private applicationService: ApplicationService,
    private jobOfferService: JobOfferService
  ) { }

  ngOnInit(): void {
    this.loadApplications();
    this.loadJobOffers();
  }

  loadApplications(): void {
    this.applicationService.getAllApplications().subscribe({
      next: (data) => {
        this.applications = data;
        this.updatePagination();
      },
      error: (err) => console.error(err)
    });
  }

  loadJobOffers(): void {
    this.jobOfferService.getAllJobOffers().subscribe({
      next: (data) => this.jobOffers = data,
      error: (err) => console.error(err)
    });
  }

  // Update totalPages based on the current filtered list
  updatePagination(): void {
    this.totalPages = Math.ceil(this.applications.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  // Getter for paginated applications
  get paginatedApplications(): Application[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.applications.slice(start, start + this.itemsPerPage);
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

  createApplication(): void {
    if (this.jobOfferIdForNewApp) {
      this.applicationService.createApplication(this.newApp, this.jobOfferIdForNewApp).subscribe({
        next: (created) => {
          this.applications.push(created);
          this.updatePagination();
          this.newApp = {
            coverLetter: '',
            resume: '',
            applicationDate: '',
            interviewSchedule: ''
          };
          this.jobOfferIdForNewApp = null;
        },
        error: (err) => console.error(err)
      });
    } else {
      alert('Veuillez spécifier un jobOfferId');
    }
  }

  selectAppForUpdate(app: Application): void {
    // Clone the selected application so changes do not immediately reflect in the list.
    this.selectedApp = { ...app };
  }

  updateApplication(): void {
    if (this.selectedApp && this.selectedApp.id) {
      this.applicationService.updateApplication(this.selectedApp.id, this.selectedApp).subscribe({
        next: (updated) => {
          const index = this.applications.findIndex(a => a.id === updated.id);
          if (index !== -1) {
            this.applications[index] = updated;
          }
          this.selectedApp = null;
        },
        error: (err) => console.error(err)
      });
    }
  }

  deleteApplication(id: number): void {
    this.applicationService.deleteApplication(id).subscribe({
      next: () => {
        this.applications = this.applications.filter(a => a.id !== id);
        this.updatePagination();
      },
      error: (err) => console.error(err)
    });
  }


  // New method to view related job offer details
  viewJobOffer(app: Application): void {
    // Since the returned object includes a nested jobOffer property,
    // we can store the entire object as any.
    this.selectedApplication = app;
  }
  closeJobOfferModal(): void {
    this.selectedApplication = null;
  }
}
