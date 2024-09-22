import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Event_model, EventoResponse} from "../event_model";
import {EventService} from "../event.service";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {initFlowbite} from "flowbite";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-event-recomendation',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgStyle,
    NgOptimizedImage,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './event-recomendation.component.html',
  styleUrl: './event-recomendation.component.scss'
})
export class EventRecomendationComponent implements OnInit {

  eventsCarrusel$: Observable<Event_model[]> = new Observable();
  eventsCards$: Observable<Event_model[]> = new Observable();
  private eventoService = inject(EventService);

  constructor() { }

  ngOnInit(): void {
    this.fetchEventos();
    initFlowbite();
  }

  fetchEventos(): void {
    const eventos$ = this.eventoService.getEventos(); // Obtenemos un observable de eventos

    // Filtramos los eventos para el carrusel y las cards sincrónicamente
    this.eventsCarrusel$ = eventos$.pipe(
      map(data => data.slice(0, 4)) // Primeros 4 eventos para el carrusel
    );

    this.eventsCards$ = eventos$.pipe(
      map(data => data.slice(4)) // Los otros 8 eventos para las cards
    );
  }
}
