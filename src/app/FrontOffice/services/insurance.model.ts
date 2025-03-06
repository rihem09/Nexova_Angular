import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Insurance } from '../models/insurance.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  private apiUrl = 'http://localhost:8020/user/api/insurance';

  constructor(private http: HttpClient) {}

  createInsurance(insurance: Insurance): Observable<Insurance> {
    return this.http.post<Insurance>(this.apiUrl, insurance);
  }

  getAllInsurances(): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(this.apiUrl);
  }

  getInsuranceById(id: number): Observable<Insurance> {
    return this.http.get<Insurance>(`${this.apiUrl}/${id}`);
  }

  updateInsurance(id: number, insurance: Insurance): Observable<Insurance> {
    return this.http.put<Insurance>(`${this.apiUrl}/${id}`, insurance);
  }

  deleteInsurance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createPaymentIntent(id: number | undefined): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>(`${this.apiUrl}/${id}/payment`, {});
  }

  confirmPayment(id: number | undefined): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/payment/confirm`, {});
  }
}
