import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event_model} from "../event_model";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8088/api/v1/'; // URL del backend

  private categoriasSeleccionadas: number[] = [];

  // Guardar las categorías seleccionadas
  setCategoriasSeleccionadas(categorias: number[]): void {
    this.categoriasSeleccionadas = categorias;
  }

  // Obtener las categorías seleccionadas
  getCategoriasSeleccionadas(): number[] {
    return this.categoriasSeleccionadas;
  }

  constructor(public http: HttpClient) { }

  // Método para obtener eventos por categorías seleccionadas
  getEventosByCategorias(categoriasSeleccionadas: number[]): Observable<Event_model[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Event_model[]>(`${this.apiUrl}category/by-categories`, categoriasSeleccionadas, { headers });
  }


}
