import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BACK_URL ="http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class PassService {

  constructor(private http:HttpClient) { }

  showPass(){
    return this.http.get(BACK_URL + "/event/pass/show_pass");
  }
}
