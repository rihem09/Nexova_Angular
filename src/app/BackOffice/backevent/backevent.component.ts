import { Component, OnInit } from '@angular/core';
import { EventService } from '../../service/event.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-backevent',
  templateUrl: './backevent.component.html',
  styleUrls: ['./backevent.component.css']
})
export class BackeventComponent implements OnInit {
  page: number = 1;  // Numéro de la page actuelle
  itemsPerPage: number = 8; // Nombre d'événements par page
  todayDate: string = '';


  events: any[] = []; // Liste des événements
  newEvent = {
    title: '',
    venue:'',
    description: '',
    dateEvent: '',
    duration: null,
    eventp: ''
  };

  searchForm: FormGroup; // Formulaire de recherche
  eventForm: FormGroup; // Formulaire d'ajout/édition
  selectedEvent: any = null; // Événement sélectionné pour modification
  showForm: boolean = false;

  ngOnInit(): void {
    this.loadEvents();
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
    
  }

  constructor(private eventService: EventService, private fb: FormBuilder, private snackBar: MatSnackBar) 
  {
    // Initialisation des formulaires
    this.searchForm = new FormGroup({
      query: new FormControl('')
    });

    this.eventForm = this.fb.group({
      title: '',
    venue:'',
    description: '',
    dateEvent: '',
    duration: null,
    eventp: ''
    });
  }

  
  toggleForm() {
    this.showForm = !this.showForm; // ✅ Permet d'afficher/cacher le formulaire
  }

  /*********************** REFRESH ****************************************/
  loadEvents() {
    this.eventService.showEvent().subscribe((data: any) => {
      this.events = data;
      
    });
  }

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

   /*********************** ADD ****************************************/
  saveEvent() {
    const eventData = this.eventForm.value;
   
  }

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
  /****************************** UPDATE *********************************/
  loadEventToUpdate(event: any) {
    this.selectedEvent = { ...event }; // Copie les détails de l'événement
    this.eventForm = { ...event }; // Charge les détails dans le formulaire
    this.showForm = true; // Affiche le formulaire
  }
  
  editEvent(event: any) {
    this.selectedEvent = event; // Stocke l'événement sélectionné
    this.eventForm.patchValue({
      title: event.title,
      date: event.dateEvent, // Assurez-vous que le champ correspond à votre modèle
      description: event.description
    });
    this.showForm = true; // Affiche le formulaire
  }

  /**************************** DELETE ***********************************/
  deleteEvent(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.loadEvents(); // Actualise la liste des événements après la suppression
      });
    }
  }

  

  
}