import {Component, inject, Input, OnInit} from '@angular/core';
import {EventModel, EventoResponse} from "../model/event.model";
import {EventService} from "../services/event.service";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {TagModule} from "primeng/tag";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {BehaviorSubject, Observable, of, switchMap} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {SearchService} from "../services/search.service";
import {UiService} from "../../common/ui.service";
import {FavoriteService} from "../services/favorite.service";

@Component({
  selector: 'app-all-event',
  standalone: true,
  imports: [
    TagModule,
    NgStyle,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
    Button,
    NgForOf,
    AsyncPipe,
    NgIf,
    NgClass
  ],
  templateUrl: './all-event.component.html',
  styleUrl: './all-event.component.scss'
})
export class AllEventComponent implements OnInit{

  events$: Observable<EventModel[]> = new Observable();
  filteredEvents$: Observable<EventModel[]> = new Observable();
  totalElements: number = 0;       // Total de eventos
  pageSize: number = 12;            // Tamaño de la página, 6 *cards* por página
  currentPage: number = 0;         // Página actual
  pageSizeOptions: number[] = [5, 10, 20, 100];  // Opciones de tamaño para la paginación
  uiService = inject(UiService);
  favoriteService = inject(FavoriteService);

  constructor(private eventService: EventService, private searchService:SearchService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios en la búsqueda
    this.loadEvents(this.currentPage, this.pageSize);

  }


  // Método para cargar los eventos
  loadEvents(page: number, size: number) {
    this.events$ = this.eventService.getAllEvents(page, size).pipe(
      map((response: EventoResponse) => {
        this.totalElements = response.totalElements;
        return response.content;
      })
    );
    this.filteredEvents$ = this.events$;
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

