import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../service/feedback.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-backfeedback',
  templateUrl: './backfeedback.component.html',
  styleUrls: ['./backfeedback.component.css']
})
export class BackfeedbackComponent implements OnInit {
  feedbacks: any[] = [];

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.feedbacks = data.map(feedback => {
            console.log('Raw feedback:', feedback); // Debug the raw data
            const mappedFeedback = {
              ...feedback,
              idFeedback: feedback.idFeedback,
              eventName: feedback.event?.title || 'N/A'
            };
            console.log('Mapped feedback:', mappedFeedback); // Debug the mapped data
            return mappedFeedback;
          });
        } else {
          this.feedbacks = [];
        }
      },
      error: (error) => console.error('Error loading feedbacks:', error)
    });
  }

  deleteFeedback(feedbackId: number): void {
   
  
    this.feedbackService.deleteFeedback(feedbackId).subscribe({
      next: () => {
        console.log("Feedback supprimé");
        this.loadFeedbacks();
      },
      error: err => console.error("Erreur de suppression :", err)
    });
  }
  
  
  

}
