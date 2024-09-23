import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Event_model} from "./event_model";
import {CacheService} from "../common/cache.service";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8088/api/v1/';
  private cacheKey = 'proximosEventos';

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  getEventos(): Observable<Event_model[]> {

    const cachedEventos = this.cacheService.getItem<Event_model[]>(this.cacheKey);

    if (cachedEventos) {
      return of(cachedEventos); // Retorna los eventos desde el caché
    } else {
      // Si no hay eventos en caché, solicita desde la API
      return this.http.get<Event_model[]>(`${this.apiUrl}events/proximos`).pipe(
        tap(eventos => {
          this.cacheService.setItem(this.cacheKey, eventos);
        })
      );
    }
  }


  getEventById(eventId: number): Observable<Event_model> {
    return this.http.get<Event_model>(`${this.apiUrl}events/${eventId}`);
  }

  // Método para obtener los eventos con paginación
  getAllEvents(page: number, size: number): Observable<Event_model[]> {
    return this.http
      .get<{ content: Event_model[] }>(`${this.apiUrl}events?page=${page}&size=${size}`)
      .pipe(map((response) => response.content));
  }

}
