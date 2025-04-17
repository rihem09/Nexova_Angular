export interface JobOffer {
    id?: number;                 // ? => champ optionnel
    jobTitle: string;
    companyName: string;
    jobDescription: string;
    location: string;
    jobType: string;
    salary: number;
    applicationDeadline: string; // ou Date si vous gérez la conversion
}
