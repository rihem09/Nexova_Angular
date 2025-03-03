import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { EventService } from 'src/app/service/event.service';

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
  newEvent = {
    title: '',
    venue:'',
    description: '',
    dateEvent: '',
    duration: null,
    eventp: ''
  };
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.showEvent(); 
  }

  
     showEvent() {
    this.eventService.showEvent().subscribe((res) => {
     console.log(res);
     this.events=res;
    });
  }

  onSubmit(): void {
    if (this.newEvent) {
      this.eventService.addEvent(this.newEvent).subscribe(response => {
        console.log('Event planned :', response);
        this.events.push(response); // Ajouter le nouvel événement à la liste sans recharger la page
        this.resetForm(); // Réinitialiser le formulaire après l'ajout
      });
    }
  }

  // Réinitialiser le formulaire après l'ajout
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

}
