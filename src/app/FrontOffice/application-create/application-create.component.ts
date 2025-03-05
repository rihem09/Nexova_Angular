// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Application } from 'src/app/models/application.model';
// import { ApplicationService } from 'src/app/services/services/application.service';

// @Component({
//   selector: 'app-application-create',
//   templateUrl: './application-create.component.html',
//   styleUrls: ['./application-create.component.css']
// })
// export class ApplicationCreateComponent implements OnInit {

//   newApp: Application = {
//     coverLetter: '',
//     resume: '',
//     applicationDate: '',
//     interviewSchedule: ''
//   };

//   jobOfferId: number | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private applicationService: ApplicationService
//   ) {}

//   ngOnInit(): void {
//     // Extract the jobOfferId from the route param
//     this.jobOfferId = Number(this.route.snapshot.paramMap.get('jobOfferId'));
//   }

//   createApplication(): void {
//     if (this.jobOfferId) {
//       this.applicationService.createApplication(this.newApp, this.jobOfferId).subscribe({
//         next: (created) => {
//           alert('Application created successfully!');
//           // Optionally navigate back to the job-offers list
//         },
//         error: (err) => console.error(err)
//       });
//     } else {
//       alert('No jobOfferId provided.');
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/models/application.model';
import { ApplicationService } from 'src/app/services/services/application.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-application-create',
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.css']
})
export class ApplicationCreateComponent implements OnInit {

  newApp: Application = {
    coverLetter: '',
    resume: '',
    applicationDate: '',
    interviewSchedule: ''
  };

  jobOfferId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    // Extract the jobOfferId from the route param
    this.jobOfferId = Number(this.route.snapshot.paramMap.get('jobOfferId'));
  }

  onSubmit(form: NgForm): void {
    // If form is invalid, just return (though the button is disabled if invalid)
    if (form.invalid) {
      return;
    }

    if (this.jobOfferId) {
      this.applicationService.createApplication(this.newApp, this.jobOfferId).subscribe({
        next: (created) => {
          alert('Application created successfully!');
          // Optionally navigate back to the job-offers list
          form.resetForm(); // reset form after success
        },
        error: (err) => console.error(err)
      });
    } else {
      alert('No jobOfferId provided.');
    }
  }
}
