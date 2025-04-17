// import { Component, OnInit } from '@angular/core';
// import { Application } from '../../models/application.model';
// import { ApplicationService } from '../../services/services/application.service';
// import { JobOffer } from 'src/app/models/job-offer.model';
// import { JobOfferService } from 'src/app/services/services/job-offer.service';

// @Component({
//   selector: 'app-application',
//   templateUrl: './application.component.html',
//   styleUrls: ['./application.component.css']
// })
// export class ApplicationComponent implements OnInit {

//   applications: Application[] = [];
//   newApp: Application = {
//     coverLetter: '',
//     resume: '',
//     applicationDate: '',
//     interviewSchedule: ''
//   };
//   selectedApp: Application | null = null;
//   jobOfferIdForNewApp: number | null = null; // ID de l'offre à laquelle on postule
//   // 3) Array to store all available JobOffers
//   jobOffers: JobOffer[] = [];
//   constructor(
//     private applicationService: ApplicationService,
//     private jobOfferService: JobOfferService
//   ) { }

//   ngOnInit(): void {
//     this.loadApplications();
//     this.loadJobOffers(); // Load job offers to populate the dropdown

//   }

//   loadApplications(): void {
//     this.applicationService.getAllApplications().subscribe({
//       next: (data) => this.applications = data,
//       error: (err) => console.error(err)
//     });
//   }
//   // 5) Load all job offers from the backend
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
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/services/application.service';
import { JobOffer } from 'src/app/models/job-offer.model';
import { JobOfferService } from 'src/app/services/services/job-offer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

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
  coverLetterFile: File | null = null;
  resumeFile: File | null = null;

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
      next: (data) => this.applications = data,
      error: (err) => console.error(err)
    });
  }

  loadJobOffers(): void {
    this.jobOfferService.getAllJobOffers().subscribe({
      next: (data) => this.jobOffers = data,
      error: (err) => console.error(err)
    });
  }

  onFileChange(event: any, type: string): void {
    const file = event.target.files[0];
    if (type === 'coverLetter') {
      this.coverLetterFile = file;
    } else if (type === 'resume') {
      this.resumeFile = file;
    }
  }

  createApplication(): void {
    if (this.jobOfferIdForNewApp) {
      const formData = new FormData();
      formData.append('email', this.newApp.email);
      formData.append('nom', this.newApp.nom);
      formData.append('prenom', this.newApp.prenom);
      formData.append('dateDeNaissance', this.newApp.dateDeNaissance);
      formData.append('adresse', this.newApp.adresse);
      formData.append('codePostal', this.newApp.codePostal);
      formData.append('ville', this.newApp.ville);
      formData.append('telephone', this.newApp.telephone);
      formData.append('niveauEtude', this.newApp.niveauEtude);
      formData.append('niveauExperience', this.newApp.niveauExperience);
      formData.append('specialiteEtude', this.newApp.specialiteEtude);
      formData.append('coverLetter', this.coverLetterFile!);
      formData.append('resume', this.resumeFile!);

      this.applicationService.createApplicationWithFiles(formData, this.jobOfferIdForNewApp).subscribe({
        next: (created) => {
          this.applications.push(created);
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
    this.selectedApp = { ...app };
  }

  updateApplication(): void {
    if (this.selectedApp && this.selectedApp.id) {
      const formData = new FormData();
      formData.append('email', this.selectedApp.email!);
      formData.append('nom', this.selectedApp.nom!);
      formData.append('prenom', this.selectedApp.prenom!);
      formData.append('dateDeNaissance', this.selectedApp.dateDeNaissance!);
      formData.append('adresse', this.selectedApp.adresse!);
      formData.append('codePostal', this.selectedApp.codePostal!);
      formData.append('ville', this.selectedApp.ville!);
      formData.append('telephone', this.selectedApp.telephone!);
      formData.append('niveauEtude', this.selectedApp.niveauEtude!);
      formData.append('niveauExperience', this.selectedApp.niveauExperience!);
      formData.append('specialiteEtude', this.selectedApp.specialiteEtude!);

      if (this.coverLetterFile) {
        formData.append('coverLetter', this.coverLetterFile);
      }
      if (this.resumeFile) {
        formData.append('resume', this.resumeFile);
      }

      // this.applicationService.updateApplicationWithFiles(this.selectedApp.id, formData).subscribe({
      //   next: (updated) => {
      //     const index = this.applications.findIndex(a => a.id === updated.id);
      //     if (index !== -1) {
      //       this.applications[index] = updated;
      //     }
      //     this.selectedApp = null;
      //   },
      //   error: (err) => console.error(err)
      // });
    }
  }

  deleteApplication(id: number): void {
    this.applicationService.deleteApplication(id).subscribe({
      next: () => {
        this.applications = this.applications.filter(a => a.id !== id);
      },
      error: (err) => console.error(err)
    });
  }
}
