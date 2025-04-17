import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ai-job-chat',
  templateUrl: './ai-job-chat.component.html'
})
export class AiJobChatComponent {
  userMessage: string = '';
  @Output() criteriaFound = new EventEmitter<{ location?: string, domain?: string }>();

  constructor(private http: HttpClient) {}

  askAI() {
    if (!this.userMessage) return;

    this.http.post<{ location?: string, domain?: string }>(
      'http://localhost:8082/api/ai/parse-job-search',
      { userMessage: this.userMessage }
    ).subscribe({
      next: (result) => {
        console.log('🎯 Résultat IA :', result);
        this.criteriaFound.emit(result);
      },
      error: (err) => console.error('Erreur OpenAI :', err)
    });
  }
}