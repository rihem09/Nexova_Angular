import { Component, OnInit } from '@angular/core';
import { EventService } from '../../service/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-backevent',
  templateUrl: './backevent.component.html',
  styleUrls: ['./backevent.component.css']
})
export class BackeventComponent implements OnInit {
  eventForm: FormGroup;
  events: any[] = [];
  isEditMode = false;
  currentEventId: number | null = null;

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      venue: ['', [Validators.required]],
      dateEvent: ['', [Validators.required]],
      duration: ['', [Validators.required, Validators.min(1)]],
      eventp: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.showEvent().subscribe({
      next: (data: any) => {
        this.events = data;
      },
      error: (error) => {
        this.showNotification('Error loading events', 'error');
      }
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const formData = this.eventForm.value;
      
      if (this.isEditMode && this.currentEventId) {
        // Add the ID to the form data for update
        const eventToUpdate = {
          idEvent: this.currentEventId,
          ...formData
        };
        
        this.eventService.modEvent(this.currentEventId, eventToUpdate).subscribe({
          next: () => {
            this.showNotification('Event updated successfully', 'success');
            this.resetForm();
            this.loadEvents();
          },
          error: (error) => {
            this.showNotification('Error updating event: ' + error.message, 'error');
          }
        });
      } else {
        this.eventService.addEvent(this.eventForm.value).subscribe({
          next: () => {
            this.showNotification('Event added successfully', 'success');
            this.resetForm();
            this.loadEvents();
          },
          error: (error) => {
            this.showNotification('Error adding event', 'error');
          }
        });
      }
    }
  }

  onEdit(event: any) {
    this.isEditMode = true;
    this.currentEventId = event.idEvent;
    
    // Format the date to YYYY-MM-DD for the input field
    const formattedDate = new Date(event.dateEvent).toISOString().split('T')[0];
    
    this.eventForm.patchValue({
      title: event.title,
      description: event.description,
      venue: event.venue,
      dateEvent: formattedDate,
      duration: event.duration,
      eventp: event.eventp
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          this.showNotification('Event deleted successfully', 'success');
          this.loadEvents();
        },
        error: (error) => {
          this.showNotification('Error deleting event', 'error');
        }
      });
    }
  }

  resetForm() {
    this.eventForm.reset();
    this.isEditMode = false;
    this.currentEventId = null;
  }

  private showNotification(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar']
    });
  }
}