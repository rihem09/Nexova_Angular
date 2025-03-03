import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BACK_URL ="http://localhost:8080";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }

  addEvent(event:any){
    return this.http.post(BACK_URL + "/event/event/add_event", 
      event,{headers:new HttpHeaders()
        .set('Content-Type',"application/json")
  })
  }

  update(event:any){
    return this.http.post(BACK_URL + "/event/event/mod_event", 
      event,{headers:new HttpHeaders()
        .set('Content-Type',"application/json")
  })
  }

  showEvent(){
    return this.http.get(BACK_URL + "/event/event/show_event");
  }

  delete(id:any){
    return this.http.post(BACK_URL + "/event/event/del_event/"+id, 
      event,{headers:new HttpHeaders()
        .set('Content-Type',"application/json")
  })
  
}}

