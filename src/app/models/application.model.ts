export interface Application {
    id?: number;
    coverLetter: string;
    resume: string;
    applicationDate: string;   // ou Date
    interviewSchedule: string; // ou Date
    jobOfferId?: number;       // on stocke l'id de l'offre associée
}
