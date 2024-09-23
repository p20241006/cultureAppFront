import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Rating} from "../model/rate.model";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private apiUrl = 'http://localhost:8088/api/v1/feedbacks'; // Cambia a tu API real

  constructor(private http: HttpClient) { }

  enviarPuntuacion(eventId: number, note: number, comment: string = ''): Observable<any> {
    const body = {
      note,
      comment,
      eventId
    };
    return this.http.post(this.apiUrl, body);
  }
}
