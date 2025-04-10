import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../service/feedback.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit{
  showFeedbackForm: boolean = false;
  eventId: number=0; 
  feedbacks: any[] = [];
  newFeedback = {
    rating: 0,
    comment: ''
  }; 
  selectedFeedback: any = null; // Feedback sélectionné pour modification

  constructor(
    private route: ActivatedRoute, //to get idevent from url
    private feedbackService: FeedbackService 
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = +params.get('eventId')!;
      if (!isNaN(this.eventId)) {
        this.loadFeedbacks();
      }
    });
  }
  
 

  loadFeedbacks() {
    this.feedbackService.getFeedbacksByEvent(this.eventId).subscribe((data: any) => {
      this.feedbacks = data; // Mettre à jour la liste des feedbacks
    });
  }

/*********************** ADD ****************************************/
addFeedback() {
  const feedbackData = { ...this.newFeedback, eventId: this.eventId };
  this.showFeedbackForm = false;
  console.log("Envoi du feedback:", feedbackData); // Debugging

  this.feedbackService.addFeedback(this.eventId, feedbackData).subscribe(
    () => {
      this.loadFeedbacks(); // Rafraîchir la liste
      this.newFeedback = { rating: 0, comment: '' }; // Réinitialiser le formulaire
    },
    (error) => {
      console.error("Erreur lors de l'ajout du feedback:", error);
    }
  );
}
  /*********************** UPDATE ****************************************/
  loadFeedbackToUpdate(feedback: any) {
    this.selectedFeedback = { ...feedback }; // Copier les données du feedback sélectionné
    this.newFeedback = {...feedback};
    this.showFeedbackForm = false;
  this.selectedFeedback = null;
  }

  updateFeedback() {
    if (this.selectedFeedback) {
      this.feedbackService.updateFeedback(this.selectedFeedback.idFeed, this.selectedFeedback).subscribe(() => {
        this.loadFeedbacks(); // Recharger les feedbacks après la modification
        this.selectedFeedback = null; // Réinitialiser le feedback sélectionné
      });
    }
  }
  
/*********************** DELETE ****************************************/
  deleteFeedback(feedbackId: number) {
    if (confirm('Confirm delition ?')) {
      this.feedbackService.deleteFeedback(feedbackId).subscribe(() => {
        this.loadFeedbacks(); // Recharger les feedbacks après la suppression
      });
    }
  }



}
