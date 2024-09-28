import { Component, inject, OnInit } from '@angular/core';
import {EventModel} from "../model/event.model";
import { EventService } from "../services/event.service";
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
import {ActivatedRoute, RouterLink} from "@angular/router";
import {EventCategoryComponent} from "../event-category/event-category.component";
import {UserTableComponent} from "../../administrator/user-table/user-table.component";
import {AuthService} from "../../auth/auth.service";
import {RecommendedEvent} from "../model/event-gnn";
import {UiService} from "../../common/ui.service";
import {FavoriteService} from "../services/favorite.service";


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
    GalleriaModule,
    RouterLink,
    EventCategoryComponent,
    UserTableComponent,
  ],
  templateUrl: './event-recomendation.component.html',
  styleUrls: ['./event-recomendation.component.scss' // Corregido el nombre de la propiedad
  ]
})
export class EventRecomendationComponent implements OnInit {

  eventsCarrusel$: Observable<EventModel[]> = new Observable();
  eventsCards$: Observable<EventModel[]> = new Observable();
  eventoService = inject(EventService);
  responsiveOptions: any[] | undefined;
  events$: Observable<RecommendedEvent[]> = new Observable();
  authService = inject(AuthService)
  uiService =  inject(UiService);
  favoriteService = inject(FavoriteService);

  recommendedEvents: RecommendedEvent[] = [];
  loading: boolean = true;
  error: string | null = null;




  constructor(

  ) { }

  ngOnInit(): void {
    this.fetchEventos();
    let id = this.authService.currentUser$.value.id;
    this.fetchRecommendedEvents(3);
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
    const eventosRecomendados$ = this.eventoService.getEventos();

    this.eventsCarrusel$ = eventosRecomendados$.pipe(
      map(data => data.slice(0, 3))
    );

    this.eventsCards$ = eventosRecomendados$.pipe(
      map(data => data.slice(3))
    );
  }

  fetchRecommendedEvents(userId: number): void {
    this.eventoService.getRecommendedEvents(userId).subscribe({
      next: (response) => {
        this.recommendedEvents = response.recommended_events;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar los eventos recomendados';
        this.loading = false;
      }
    });
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

  event = {
    rate: 0 // Ejemplo de valor de rate
  };

  isLiked = false;

  // Función para devolver un arreglo de estrellas
  getStars(rate: number): { filled: boolean }[] {
    const totalStars = 5; // Total de estrellas a mostrar
    return Array.from({ length: totalStars }, (_, index) => ({
      filled: index < rate // Determina si la estrella debe ser dorada o gris
    }));
  }

  likedEvents: { [key: number]: boolean } = {}; // Almacena los likes de cada evento por su ID


  // Verifica si un evento está liked
  isEventLiked(eventId: number): boolean {
    return this.likedEvents[eventId];
  }

  toggleFavorite(eventId: number) {
    this.favoriteService.toggleFavorite(eventId).subscribe({
      next: () => {
        this.likedEvents[eventId] = !this.likedEvents[eventId]; // Invertimos el estado
        this.saveLikedEvents(); // Guardamos el nuevo estado en localStorage
        const message = this.likedEvents[eventId] ? 'agregado' : 'removido';
        this.uiService.showToast(`El evento ha sido ${message} de tus favoritos.`);
      },
      error: () => {
        this.uiService.showToast('Error al cambiar el estado de favorito.');
      }
    });
  }

// Guardar el estado actual de los likes en localStorage
  saveLikedEvents() {
    localStorage.setItem('likedEvents', JSON.stringify(this.likedEvents));
  }
  display: boolean = false;
}
