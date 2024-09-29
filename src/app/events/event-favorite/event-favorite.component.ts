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
export class EventFavoriteComponent implements OnInit {

  totalElements: number = 0;       // Total de eventos
  pageSize: number = 12;            // Tamaño de la página, 12 cards por página
  currentPage: number = 0;         // Página actual
  pageSizeOptions: number[] = [5, 10, 20, 100];  // Opciones de tamaño para la paginación

  uiService = inject(UiService);
  favoriteEvents$: Observable<EventModel[]> = new Observable();
  likedEvents: { [key: number]: boolean } = {}; // Almacena los likes de cada evento por su ID

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    // Cargar los eventos favoritos al inicio
    this.loadEvents(this.currentPage, this.pageSize);
  }

  // Metodo para cargar los eventos
  loadEvents(page: number, size: number) {
    this.favoriteEvents$ = this.favoriteService.getFavoriteEvents().pipe(
      map(events => {
        events.forEach(event => {
          this.loadEventFavorites(event.id); // Cargar el estado favorito de cada evento
        });
        this.totalElements = events.length;
        return events; // Retorna la lista de eventos
      })
    );
  }

  // Cargar el estado de favorito de un evento
  loadEventFavorites(eventId: number) {
    this.favoriteService.statusFavoriteEvent(eventId).subscribe({
      next: (isFavorite: boolean) => {
        this.likedEvents[eventId] = isFavorite; // Asignar el estado favorito
      },
      error: () => {
        console.error('Error al cargar el estado de favoritos del evento:', eventId);
      }
    });
  }

  // Alternar el estado de favorito al hacer clic
  toggleFavorite(eventId: number) {
    this.favoriteService.toggleFavorite(eventId).subscribe({
      next: () => {
        this.likedEvents[eventId] = !this.likedEvents[eventId]; // Cambiar el estado localmente
        const message = this.likedEvents[eventId] ? 'agregado' : 'removido';
        this.uiService.showToast(`El evento ha sido ${message} de tus favoritos.`);
      },
      error: () => {
        this.uiService.showToast('Error al cambiar el estado de favorito.');
      }
    });
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

  // Función para devolver un arreglo de estrellas
  getStars(rate: number): { filled: boolean }[] {
    const totalStars = 5; // Total de estrellas a mostrar
    return Array.from({ length: totalStars }, (_, index) => ({
      filled: index < rate // Determina si la estrella debe ser dorada o gris
    }));
  }
}
