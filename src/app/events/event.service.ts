import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event_model} from "./event_model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8088/api/v1/events/api/'

  constructor(private http: HttpClient) { }

  // Método para obtener todos los eventos
  getEventos(): Observable<Event_model[]> {
    return this.http.get<Event_model[]>(`${this.apiUrl}eventos/proximos`);
  }


}
