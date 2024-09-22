import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Event_model} from "./event_model";
import {CacheService} from "../common/cache.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8088/api/v1/events/api/';
  private cacheKey = 'proximosEventos';

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  getEventos(): Observable<Event_model[]> {
    // Intentar obtener los eventos del caché
    const cachedEventos = this.cacheService.getItem<Event_model[]>(this.cacheKey);

    if (cachedEventos) {
      return of(cachedEventos); // Retorna los eventos desde el caché
    } else {
      // Si no hay eventos en caché, solicita desde la API
      return this.http.get<Event_model[]>(`${this.apiUrl}eventos/proximos`).pipe(
        tap(eventos => {
          this.cacheService.setItem(this.cacheKey, eventos);
        })
      );
    }
  }

  // Método para actualizar eventos
  actualizarEventos(): Observable<Event_model[]> {
    return this.http.get<Event_model[]>(`${this.apiUrl}eventos/proximos`).pipe(
      tap(eventos => {
        // Guarda los nuevos eventos en caché
        this.cacheService.setItem(this.cacheKey, eventos);
      })
    );
  }


}
