import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventModel} from "../model/event.model";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private apiUrl = 'http://localhost:8088/api/v1/';

  constructor(private http: HttpClient) {}

  toggleFavorite(eventId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}favoritos/toggle/${eventId}`, {});
  }

  getFavoriteEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${this.apiUrl}favoritos/events`);
  }

}
