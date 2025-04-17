import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/models/application.model';
import { ApplicationService } from 'src/app/services/services/application.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-application-create',
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.css']
})
export class ApplicationCreateComponent implements OnInit {

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

  jobOfferId: number | null = null;
  coverLetterFile: File | null = null;
  resumeFile: File | null = null;

  // 🔐 reCAPTCHA variables
  captchaSuccess: boolean = false;
  captchaToken: string = '';

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.jobOfferId = Number(this.route.snapshot.paramMap.get('jobOfferId'));
  }

  // 🔄 Fichiers CV et lettre
  onFileChange(event: any, type: string): void {
    const file = event.target.files[0];
    if (type === 'coverLetter') {
      this.coverLetterFile = file;
    } else if (type === 'resume') {
      this.resumeFile = file;
    }
  }

  // ✅ Méthode appelée quand le CAPTCHA est validé
  onCaptchaResolved(token: string) {
    this.captchaToken = token;
    this.captchaSuccess = true;
  }

  // 📤 Soumission du formulaire
  onSubmit(form: NgForm): void {
    if (form.invalid || !this.captchaToken) {
      alert('Veuillez remplir tous les champs et valider le reCAPTCHA.');
      return;
    }

    if (this.jobOfferId && this.coverLetterFile && this.resumeFile) {
      const formData = new FormData();
      formData.append('email', this.newApp.email);
      formData.append('nom', this.newApp.nom);
      formData.append('prenom', this.newApp.prenom);
      formData.append('dateDeNaissance', this.newApp.dateDeNaissance.toString());
      formData.append('adresse', this.newApp.adresse);
      formData.append('codePostal', this.newApp.codePostal);
      formData.append('ville', this.newApp.ville);
      formData.append('telephone', this.newApp.telephone);
      formData.append('niveauEtude', this.newApp.niveauEtude);
      formData.append('niveauExperience', this.newApp.niveauExperience);
      formData.append('specialiteEtude', this.newApp.specialiteEtude);
      formData.append('coverLetter', this.coverLetterFile);
      formData.append('resume', this.resumeFile);

      // 🔐 Ajouter le token reCAPTCHA au backend
      formData.append('recaptchaToken', this.captchaToken);

      this.applicationService.createApplicationWithFiles(formData, this.jobOfferId).subscribe({
        next: (created) => {
          alert('Application created successfully!');
          form.resetForm();
          this.captchaSuccess = false; // Réinitialiser le CAPTCHA
        },
        error: (err) => console.error(err)
      });
    } else {
      alert('No jobOfferId or files provided.');
    }
  }
}