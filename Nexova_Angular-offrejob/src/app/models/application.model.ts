import { JobOffer } from "./job-offer.model";

export interface Application {
    id?: number;
    email: string;
    nom: string;
    prenom: string;
    dateDeNaissance: string; // or Date
    adresse: string;
    codePostal: string;
    ville: string;
    telephone: string;
    niveauEtude: string;
    niveauExperience: string;
    specialiteEtude: string;
    coverLetterPath: string; // path to the uploaded cover letter file
    resumePath: string;      // path to the uploaded resume file
    applicationDate: string; // or Date
    interviewSchedule: string; // or Date
    jobOfferId?: number;     // job offer associated with the application
    jobOffer?: JobOffer; // Updated to directly reference the JobOffer object

}
