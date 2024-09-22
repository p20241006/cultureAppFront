import { Component, inject, OnInit } from '@angular/core';
import { Event_model } from "../event_model";
import { EventService } from "../event.service";
import { AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle } from "@angular/common";
import { initFlowbite } from "flowbite";
import { map } from "rxjs/operators";
import { Observable, of } from "rxjs"; // Asegúrate de importar 'of'
import { CarouselModule } from "primeng/carousel";
import { Button } from "primeng/button";
import { TagModule } from "primeng/tag";
import { CardModule } from "primeng/card";
import { MatButtonModule } from "@angular/material/button";
import { GalleriaModule } from "primeng/galleria";

@Component({
  selector: 'app-event-recomendation',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgStyle,
    NgOptimizedImage,
    NgIf,
    AsyncPipe,
    CarouselModule,
    Button,
    TagModule,
    CardModule,
    MatButtonModule,
    GalleriaModule
  ],
  templateUrl: './event-recomendation.component.html',
  styleUrls: ['./event-recomendation.component.scss' // Corregido el nombre de la propiedad
  ]
})
export class EventRecomendationComponent implements OnInit {

  eventsCarrusel$: Observable<Event_model[]> = new Observable();
  eventsCards$: Observable<Event_model[]> = new Observable();
  private eventoService = inject(EventService);
  responsiveOptions: any[] | undefined;

  constructor() { }

  ngOnInit(): void {
    this.fetchEventos();
    initFlowbite();

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  fetchEventos(): void {
    const eventos$ = this.eventoService.getEventos(); // Obtenemos un observable de eventos

    // Filtramos los eventos para el carrusel y las cards
    this.eventsCarrusel$ = eventos$.pipe(
      map(data => data.slice(0, 3)) // Primeros 3 eventos para el carrusel
    );

    this.eventsCards$ = eventos$.pipe(
      map(data => data.slice(3)) // Los otros eventos para las cards
    );
  }

  // @ts-ignore
  getSeverity(status: string) {
    switch (status) {
      case 'joinnus':
        return 'success';
      case 'teleticket':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  }
}
