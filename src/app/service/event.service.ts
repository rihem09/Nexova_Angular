import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';


const BACK_URL = "http://localhost:8080/event/event";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }

  addEvent(event:any){
    return this.http.post(BACK_URL + "/add_event", 
      event,{headers:new HttpHeaders()
        .set('Content-Type',"application/json")
  })
  }

  modEvent(id: number, event: any): Observable<any> {
    return this.http.put(`${BACK_URL}/mod_event/${id}`, event);
  }

  showEvent(){
    return this.http.get(BACK_URL + "/show_event");
  }

  
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${BACK_URL}/del_event/${id}`);
}

 searchEvents(title: string): Observable<any> {
    return this.http.get(`${BACK_URL}/search_event?title=${title}`);
  }

getTopRatedEvent(): Observable<any> {
  return this.http.get<Event>(`${BACK_URL}/top-rated-event`);
}

downloadAllEventsPdf(): Observable<Blob> {
  return this.http.get('http://localhost:8080/event/pdf/events', {
    responseType: 'blob' //Pour les fichiers binaires
  });
}




}