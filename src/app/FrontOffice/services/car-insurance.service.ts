// src/app/FrontOffice/services/car-insurance.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarInsurance } from '../models/car-insurance.model';

@Injectable({
  providedIn: 'root'
})
export class CarInsuranceService {
  private apiUrl = 'http://localhost:8020/user/api/carinsurance';

  constructor(private http: HttpClient) {}

  createCarInsurance(carInsurance: CarInsurance): Observable<CarInsurance> {
    return this.http.post<CarInsurance>(this.apiUrl, carInsurance);
  }

  getAllCarInsurances(): Observable<CarInsurance[]> {
    return this.http.get<CarInsurance[]>(this.apiUrl);
  }

  getCarInsuranceById(id: number): Observable<CarInsurance> {
    return this.http.get<CarInsurance>(`${this.apiUrl}/${id}`);
  }

  updateCarInsurance(id: number, carInsurance: CarInsurance): Observable<CarInsurance> {
    return this.http.put<CarInsurance>(`${this.apiUrl}/${id}`, carInsurance);
  }

  deleteCarInsurance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createPaymentIntent(id: number | undefined): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>(`${this.apiUrl}/${id}/payment`, {});
  }

  confirmPayment(id: number | undefined): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/payment/confirm`, {});
  }
}
