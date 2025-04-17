import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobOffer } from '../../models/job-offer.model';

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {

  private baseUrl = 'http://localhost:8082/api/joboffers'; // URL de votre API

  constructor(private http: HttpClient) {}

  getAllJobOffers(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(this.baseUrl);
  }

  getJobOfferById(id: number): Observable<JobOffer> {
    return this.http.get<JobOffer>(`${this.baseUrl}/${id}`);
  }

  createJobOffer(offer: JobOffer): Observable<JobOffer> {
    return this.http.post<JobOffer>(this.baseUrl, offer);
  }

  updateJobOffer(id: number, offer: JobOffer): Observable<JobOffer> {
    return this.http.put<JobOffer>(`${this.baseUrl}/${id}`, offer);
  }

  deleteJobOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
