import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RetirementService {
  private apiUrl = 'http://localhost:9090/PI';

  constructor(private http: HttpClient) {}

  addRetraite(retraite: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/retraite/add-retraite`, retraite);
  }

  getRetraites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/retraite/retrieve-retraites`);

  }
  updateRetraite(id: number, retraiteDetails: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/retraite/modify-retraite/${id}`, retraiteDetails);
  }
  deleteRetraite(idRetraite: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/retraite/delete-retraite/${idRetraite}`);
  }

}
