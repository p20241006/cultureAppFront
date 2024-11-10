import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams,} from "@angular/common/http";
import { Observable, of} from "rxjs";
import {CacheService} from "../../common/cache.service";
import {catchError, tap} from "rxjs/operators";
import {EventModel, EventoResponse} from "../model/event.model";
import {UiService} from "../../common/ui.service";
import {EventRequestModel} from "../model/EventRequest.model";
import {RecommendedEventsResponse} from "../model/event-gcn";
import {environment} from "../../../environments/environment";
import {ErrorHandlerService} from "../../services/error-handle.service";



@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = environment.baseUrl;
  private cacheKey = 'proximosEventos';
  uiService = inject(UiService)
  errorHandler = inject(ErrorHandlerService);

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  getEventos(): Observable<EventModel[]> {
    const cachedEventos = this.cacheService.getItem<EventModel[]>(this.cacheKey);
    if (cachedEventos) {
      return of(cachedEventos); // Retorna los eventos desde el caché
    } else {
      // Si no hay eventos en caché, solicita desde la API
      return this.http.get<EventModel[]>(`${this.apiUrl}/events/proximos`).pipe(
        tap(eventos => {
          this.cacheService.setItem(this.cacheKey, eventos);
        })
      );
    }
  }

  getEventById(eventId: number): Observable<EventModel> {
    return this.http.get<EventModel>(`${this.apiUrl}/events/${eventId}`);
  }

  // Metodo para obtener los eventos con paginación
  getAllEvents(page: number, size: number): Observable<EventoResponse> {
    return this.http.get<EventoResponse>(`${this.apiUrl}/events?page=${page}&size=${size}`);
  }

  // Metodo para obtener los eventos con paginación
  getAllEventsOwner(page: number, size: number): Observable<EventoResponse> {
    return this.http.get<EventoResponse>(`${this.apiUrl}/events/owner?page=${page}&size=${size}`);
  }

  addEvento(evento: EventModel): Observable<EventModel> {
    return this.http.post<EventModel>(`${this.apiUrl}/events`, evento).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }
  // **************************
  //*** wfuturi: modelo GCN ***
  //***************************
  private baseUrl = 'https://cultureapp-model-api.onrender.com/recommendById/';

  getEventsById(id: number): Observable<RecommendedEventsResponse> {
    const url = `${this.baseUrl}${id}`;
    return this.http.get<RecommendedEventsResponse>(url);
  }

  removeEvent(id: number): Observable<void> {
    const url = `${this.apiUrl}/events/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    )
  }

  updateEvent(event: EventRequestModel):Observable<EventRequestModel> {
    return this.http.put<EventRequestModel>(`${this.apiUrl}/events/${event.id}`, event);
  }

  // Metodo para buscar eventos
  searchEvents(searchTerm: string): Observable<EventModel[]> {
    const params = new HttpParams().set('query', searchTerm);
    return this.http.get<EventModel[]>(`${this.apiUrl}/events/search`, { params });
  }


}
