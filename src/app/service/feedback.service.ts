import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BACK_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }


  getFeedbacksByEvent(eventId: number): Observable<any> {
    return this.http.get(`${BACK_URL}/event/fb/event/${eventId}`);
  }

 
  addFeedback(eventId: number, feedback: any): Observable<any> {
  // Ajoutez des logs pour débogage
  console.log('Sending feedback:', { ...feedback, eventId });
  
  return this.http.post(`${BACK_URL}/event/fb/add_fb`, { // Notez le changement d'URL
    rating: feedback.rating,
    comment: feedback.comment,
    event: { idEvent: eventId } // Structure souvent attendue côté Spring
  }, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  });
}
  


  updateFeedback(feedbackId: number, feedback: any): Observable<any> {
    return this.http.put(`${BACK_URL}/event/fb/mod_fb`, feedback);
  }

  
 
  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${BACK_URL}/event/fb/del_fb/${feedbackId}`);
  }


  getAllFeedbacks() {
    return this.http.get(`${BACK_URL}/event/fb/getTopRatedEvent`); 
  }
  
}