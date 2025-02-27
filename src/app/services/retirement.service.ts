import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RetirementService {
  private apiUrl = 'http://localhost:9090/retraite';

  constructor(private http: HttpClient) {}

  addRetraite(retraite: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-retraite`, retraite);
  }

  getRetraites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieve-retraites`);
  }
}
