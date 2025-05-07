import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BACK_URL = "http://localhost:8080/event/fb";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }


  getFeedbacksByEvent(eventId: number): Observable<any> {
    return this.http.get(`${BACK_URL}/event/${eventId}`);
  }

 
  addFeedback(eventId: number, feedback: any): Observable<any> {
  
  console.log('Sending feedback:', { ...feedback, eventId });
  
  return this.http.post(`${BACK_URL}/add_fb`, { 
    rating: feedback.rating,
    comment: feedback.comment,
    event: { idEvent: eventId } 
  }, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  });
}
  


  updateFeedback(feedbackId: number, feedback: any): Observable<any> {
    return this.http.put(`${BACK_URL}/mod_fb`, feedback);
  }

  
 
  deleteFeedback(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/event/fb/del_fb/${id}`);
  }
  

  getAllFeedbacks(): Observable<any> {
    return this.http.get(`${BACK_URL}/show_fb`); 
  }
  
}