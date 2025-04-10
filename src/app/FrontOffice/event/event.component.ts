import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { EventService } from 'src/app/service/event.service';
import { FeedbackService } from 'src/app/service/feedback.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalendarOptions } from '@fullcalendar/core'; // Import FullCalendar options
import dayGridPlugin from '@fullcalendar/daygrid'; // Import le plugin DayGrid
import { forkJoin } from 'rxjs';

/*
import { Event } from 'src/app/models/event.model';
*/

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ])
  ]
})
export class EventComponent implements OnInit{

  events: any=[];
  topRatedEvent: any;
filteredEvents: any[] = [];  
  
 eventsLoaded = false;
 topEventLoaded = false;

  page: number = 1;  // Numéro de la page actuelle
  itemsPerPage: number = 5; // Nombre d'événements par page
  
  showForm: boolean = false;
  todayDate: string = '';
  feedbacks: any=[];
  


  newEvent = {
    title: '',
    venue:'',
    description: '',
    dateEvent: '',
    duration: null,
    eventp: ''
  };
  constructor(private eventService: EventService,private feedbackService: FeedbackService, private snackBar: MatSnackBar) 
  { 
  }

  
  ngOnInit(): void {
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
  
    //chargement parallèle puis filtrage
    this.loadTopRatedEvent();
    this.loadEvents();
  }
  

  toggleForm() {
    this.showForm = !this.showForm; // ✅ Permet d'afficher/cacher le formulaire
  }

  /*********************** REFRESH ****************************************/
  loadEvents(): void {
    this.eventService.showEvent().subscribe({
      next: (data) => {
        this.events = data;
        this.eventsLoaded = true;
        // this.filterEventsIfReady();
      },
      error: (err) => console.error('Erreur events:', err)
    });
  }

  loadTopRatedEvent(): void {
    this.eventService.getTopRatedEvent().subscribe({
      next: (event) => {
        this.topRatedEvent = event;
        this.topEventLoaded = true;
        // this.filterEventsIfReady();
      },
      error: (err) => console.error('Erreur topRated:', err)
    });
  }

  // filterEventsIfReady(): void {
  //   if (this.topEventLoaded && this.eventsLoaded) {
  //     this.filteredEvents = this.events.filter((e: any) => e.idEvent !== this.topRatedEvent.idEvent);
  //   }
  // }

  /*********************** QrCode ****************************************/
  getEventQRData(event: any, feedbacks: any[]): string {
    const feedbacksText = feedbacks.map((feedback, index) => {
    }).join("\n\n");
  
    return `
   📢EVENT DETAILS
     ────────────────

  🎉 Title : ${event.title}
  📅 Date  : ${event.dateEvent}
  📍 Venue : ${event.venue}
  🎟️ Pass  : ${event.eventp}
  
  📝 Description:
  ${event.description}
  `.trim();
  }


  /*********************** SHOW + CALENDAR ****************************************/
     showEvent() {
    this.eventService.showEvent().subscribe((res) => {
     console.log(res);
     this.events=res;
     this.calendarOptions.events = this.events.map((event: any) => ({
      title: event.title,
      start: event.dateEvent, 
      description: event.description,
        duration: event.duration,
        venue: event.venue,
      }));
    });
  }

  /****************************** SUBMIT *********************************/
  onSubmit(): void {
    if (this.newEvent) {
      this.eventService.addEvent(this.newEvent).subscribe(response => {
        console.log('Event planned :', response);
        this.loadEvents(); // Recharger les événements après l'ajout
        this.resetForm(); // Réinitialiser le formulaire
        this.snackBar.open('Event planned !', 'Close', { duration: 3000 });
      });
    }
  }

  /*********************** REFRESH FORM ****************************************/
  resetForm(): void {
    this.newEvent = {
      title: '',
      venue:'',
      description: '',
      dateEvent: '',
      duration: null,
      eventp: ''
    };
  }
  /**************************** DELETE ***********************************/

  deleteEvent(id: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.loadEvents(); // Recharger les événements après la suppression
        this.snackBar.open('Event deleted !', 'Close', { duration: 3000 });
      });
    }
  }



/****************************** UPDATE *********************************/
showSuccessMessage(message: string) {
  alert(message); // Remplace par une meilleure solution (ex: toast notification)
}

loadEventToUpdate(event: any) {
  this.selectedEvent = { ...event }; // Copie les détails de l'événement
  this.newEvent = { ...event }; // Charge les détails dans le formulaire
  this.showForm = true; // Affiche le formulaire
}

selectedEvent: any = null;
updateEvent() {
  
  if (this.selectedEvent) {
    this.eventService.modEvent(this.selectedEvent.idEvent, this.newEvent).subscribe(response => {
      console.log('Event updated:', response);
      this.loadEvents(); // Recharger les événements après la modification
      this.showSuccessMessage("Event updated successfully!");
      this.resetForm();
    });
  }
  
}

/**************************** SORT ***********************************/

sortAscending: boolean = true; // Variable pour alterner le tri

sortByDate() {
  this.sortAscending = !this.sortAscending; // Inversion de l'ordre du tri
  this.events = [...this.events].sort((a, b) => {
    let dateA = new Date(a.dateEvent).getTime();
    let dateB = new Date(b.dateEvent).getTime();
    return this.sortAscending ? dateA - dateB : dateB - dateA;
  });
}
/**************************** CALENDAR ***********************************/

updateCalendar(): void {
  this.calendarOptions.events = this.events.map((event: any) => ({
    title: event.title,
    start: event.dateEvent,
    description: event.description,
    duration: event.duration,
    venue: event.venue,
  }));
}

calendarOptions: CalendarOptions = {
  initialView: 'dayGridMonth', // Vue mensuelle complète
  plugins: [dayGridPlugin], // Plugin requis
  events: [], // Chargement des événements
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    
  },
  height: 'auto', // Ajuste la hauteur dynamiquement
  contentHeight: 600, // Hauteur fixe pour éviter la compression
  aspectRatio: 1.35, // Garde un bon ratio d'affichage
  expandRows: true, // Force l'affichage sur plusieurs lignes
};

/****************************  ***********************************/




}
  