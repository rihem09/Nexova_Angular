import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const BACK_URL = "http://localhost:8080";


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

  modEvent(id: number, event: any): Observable<any> {
    return this.http.put(`${BACK_URL}/event/event/mod_event/${id}`, event);
  }

  showEvent(){
    return this.http.get(BACK_URL + "/event/event/show_event");
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${BACK_URL}/event/event/del_event/${id}`);
}

searchEvents(query: string): Observable<any> {
  return this.http.get(`${BACK_URL}/event/event/search_event?q=${query}`);
}

getTopRatedEvent(): Observable<any> {
  return this.http.get<Event>(`${BACK_URL}/event/event/top-rated-event`);
}


}

