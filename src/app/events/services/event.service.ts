import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import {CacheService} from "../../common/cache.service";
import {catchError, map, tap} from "rxjs/operators";
import {EventModel, EventoResponse} from "../model/event.model";
import {EventAdapter} from "../../adapter/EventAdapter";
import {UiService} from "../../common/ui.service";
import {EventRequestModel} from "../model/EventRequest.model";
import {RecommendedEvent, RecommendedEventsResponse} from "../model/event-gnn";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8088/api/v1/';
  private cacheKey = 'proximosEventos';
  uiService = inject(UiService)

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  getEventos(): Observable<EventModel[]> {

    const cachedEventos = this.cacheService.getItem<EventModel[]>(this.cacheKey);

    if (cachedEventos) {
      return of(cachedEventos); // Retorna los eventos desde el caché
    } else {
      // Si no hay eventos en caché, solicita desde la API
      return this.http.get<EventModel[]>(`${this.apiUrl}events/proximos`).pipe(
        tap(eventos => {
          this.cacheService.setItem(this.cacheKey, eventos);
        })
      );
    }
  }


  getEventById(eventId: number): Observable<EventModel> {
    return this.http.get<EventModel>(`${this.apiUrl}events/${eventId}`);
  }

  // Método para obtener los eventos con paginación
  getAllEvents(page: number, size: number): Observable<EventoResponse> {
    return this.http.get<EventoResponse>(`${this.apiUrl}events?page=${page}&size=${size}`);
  }

  // Método para obtener los eventos con paginación
  getAllEventsOwner(page: number, size: number): Observable<EventoResponse> {
    return this.http.get<EventoResponse>(`${this.apiUrl}events/owner?page=${page}&size=${size}`);
  }


  addEvento(evento: EventModel): Observable<EventModel> {
    return this.http.post<EventModel>(`${this.apiUrl}events`, evento);
  }
  // **************************
  //*** wfuturi: modelo GNN ***
  //***************************
  private baseUrl = 'https://cultureapp-model-api.onrender.com/recommendById/';

  getEventsById(id: number): Observable<{ recommended_events: RecommendedEvent[] }> {
    const url = `${this.baseUrl}/recommendById/${id}`;

    return this.http.get<RecommendedEvent[]>(url).pipe(
      map(events => {
        return { recommended_events: events };
      })
    );
  }

  getRecommendedEvents(userId: number): Observable<RecommendedEventsResponse> {
    return this.http.get<RecommendedEventsResponse>(`${this.baseUrl}/${userId}`);
  }



  removeEvent(id: number): Observable<void> {
    const url = `${this.apiUrl}events/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(()=>{
        this.uiService.showToast("Error al eliminar  el evento")
        return Promise.resolve()
      })
    )
  }

  updateEvent(event: EventRequestModel):Observable<EventRequestModel> {
    return this.http.put<EventRequestModel>(`${this.apiUrl}events/${event.id}`, event);
  }




}