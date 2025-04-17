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
    email: '',
    nom: '',
    prenom: '',
    dateDeNaissance: '',
    adresse: '',
    codePostal: '',
    ville: '',
    telephone: '',
    niveauEtude: '',
    niveauExperience: '',
    specialiteEtude: '',
    coverLetterPath: '',
    resumePath: '',
    applicationDate: '',
    interviewSchedule: ''
  };
  selectedApp: Application | null = null;
  jobOfferIdForNewApp: number | null = null;
  jobOffers: JobOffer[] = [];
  selectedJobOffer: JobOffer | null = null;
  selectedApplication: any = null; // For viewing related job offer details
  selectedApplicationforupdate: any = null; // For viewing related job offer details

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
  getFileUrl(filePath: string): string {
    const baseUrl = 'http://localhost:8082/api/applications';
    if (filePath.includes('cover_letters')) {
      return `${baseUrl}${filePath.split('/').pop()}`;
    } else if (filePath.includes('cvs')) {
      return `${baseUrl}${filePath.split('/').pop()}`;
    }
    return '';
  }

  // Trigger download directly using anchor element
  downloadCoverLetter(filePath: string): void {
    // Extract just the filename from the path with null check
    const fileName = filePath.includes('/') ? filePath.split('/').pop() || filePath : filePath;
    
    this.applicationService.downloadCoverLetter(fileName).subscribe(
      (response: Blob) => {
        const fileURL = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = fileName;
        link.click();
      },
      (error) => {
        console.error('Error downloading cover letter:', error);
      }
    );
  }

  // Trigger file download for resume
  downloadResume(filePath: string): void {
    const fileName = filePath.includes('/') ? filePath.split('/').pop() || filePath : filePath;
    
    this.applicationService.downloadResume(fileName).subscribe(
      (response: Blob) => {
        const fileURL = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = fileName;
        link.click();
      },
      (error) => {
        console.error('Error downloading cover letter:', error);
      }
    );
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
            email: '',
            nom: '',
            prenom: '',
            dateDeNaissance: '',
            adresse: '',
            codePostal: '',
            ville: '',
            telephone: '',
            niveauEtude: '',
            niveauExperience: '',
            specialiteEtude: '',
            coverLetterPath: '',
            resumePath: '',
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
    this.selectedApplicationforupdate= app;
  }

  updateInterviewSchedule(): void {
    if (this.selectedApp && this.selectedApp.id) {
      const updatedInterviewSchedule = this.selectedApp.interviewSchedule;

      // Call the backend service to update the interview schedule
      this.applicationService.updateInterviewSchedule(this.selectedApp.id, updatedInterviewSchedule).subscribe({
        next: (updated) => {
          const index = this.applications.findIndex(a => a.id === updated.id);
          if (index !== -1) {
            this.applications[index] = updated;
          }
          this.selectedApp = null; // Close the modal
        },
        error: (err) => console.error(err)
      });
    }
  }
  closeJobOfferModalUpdate(): void {
    this.selectedApplicationforupdate = null;
  }
  // Close the modal


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
