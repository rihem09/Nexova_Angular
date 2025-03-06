import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyInsurance } from '../models/company-insurance.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyInsuranceService {
  private apiUrl = 'http://localhost:8020/user/api/companyinsurance';

  constructor(private http: HttpClient) {}

  createCompanyInsurance(insurance: CompanyInsurance): Observable<CompanyInsurance> {
    return this.http.post<CompanyInsurance>(this.apiUrl, insurance);
  }

  getAllCompanyInsurances(): Observable<CompanyInsurance[]> {
    return this.http.get<CompanyInsurance[]>(this.apiUrl);
  }

  getCompanyInsuranceById(id: number): Observable<CompanyInsurance> {
    return this.http.get<CompanyInsurance>(`${this.apiUrl}/${id}`);
  }

  updateCompanyInsurance(id: number, insurance: CompanyInsurance): Observable<CompanyInsurance> {
    return this.http.put<CompanyInsurance>(`${this.apiUrl}/${id}`, insurance);
  }

  deleteCompanyInsurance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchCompanyInsurances(params: any): Observable<CompanyInsurance[]> {
    return this.http.get<CompanyInsurance[]>(`${this.apiUrl}/search`, { params });
  }

  createPaymentIntent(id: number): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>(`${this.apiUrl}/${id}/payment`, {});
  }


  confirmPayment(id: number | undefined): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/payment/confirm`, {});
  }
}
