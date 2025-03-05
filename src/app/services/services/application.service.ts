import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl = 'http://localhost:8082/api/applications'; // URL de votre API

  constructor(private http: HttpClient) {}

  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.baseUrl);
  }

  getApplicationById(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.baseUrl}/${id}`);
  }

  // On passe jobOfferId dans l'URL (selon le mapping qu'on a défini côté Spring)
  createApplication(app: Application, jobOfferId: number): Observable<Application> {
    return this.http.post<Application>(`${this.baseUrl}/joboffer/${jobOfferId}`, app);
  }

  updateApplication(id: number, app: Application): Observable<Application> {
    return this.http.put<Application>(`${this.baseUrl}/${id}`, app);
  }

  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
