import {Component, inject, Inject, Injectable, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, switchMap} from "rxjs";
import {EventModel, EventoResponse} from "../model/event.model";
import {EventService} from "../services/event.service";
import {SearchService} from "../services/search.service";
import {map, startWith} from "rxjs/operators";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";
import {TagModule} from "primeng/tag";
import {RouterLink} from "@angular/router";
import {FavoriteService} from "../services/favorite.service";
import {UiService} from "../../common/ui.service";

@Component({
  selector: 'app-event-favorite',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButton,
    MatPaginator,
    NgForOf,
    NgIf,
    TagModule,
    NgStyle,
    RouterLink,
    NgClass
  ],
  templateUrl: './event-favorite.component.html',
  styleUrl: './event-favorite.component.scss'
})
export class EventFavoriteComponent implements OnInit{

  eventsFavorites$: Observable<EventModel[]> = new Observable();
  totalElements: number = 0;       // Total de eventos
  pageSize: number = 12;            // Tamaño de la página, 6 *cards* por página
  currentPage: number = 0;         // Página actual
  pageSizeOptions: number[] = [5, 10, 20, 100];  // Opciones de tamaño para la paginación

  uiService= inject(UiService);
  favoriteEvents$: Observable<EventModel[]>= new Observable();

  constructor(private eventService: EventService, private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios en la búsqueda
    this.loadEvents(this.currentPage, this.pageSize);
    this.favoriteEvents$ = this.favoriteService.getFavoriteEvents();

  }


  // Método para cargar los eventos
  loadEvents(page: number, size: number) {
    this.eventsFavorites$ = this.eventService.getAllEvents(page, size).pipe(
      map((response: EventoResponse) => {
        this.totalElements = response.totalElements;
        return response.content;
      })
    );
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEvents(this.currentPage, this.pageSize);
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
