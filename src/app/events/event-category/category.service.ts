import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Event_model} from "../event_model";
import {CacheService} from "../../common/cache.service";
import {tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8088/api/v1/'; // URL del backend
  private cacheKey = 'EventosCategoria';

  private categoriasSeleccionadas: number[] = [];

  // Guardar las categorías seleccionadas
  setCategoriasSeleccionadas(categorias: number[]): void {
    this.categoriasSeleccionadas = categorias;
  }

  // Obtener las categorías seleccionadas
  getCategoriasSeleccionadas(): number[] {
    return this.categoriasSeleccionadas;
  }

  constructor(public http: HttpClient,  private cacheService: CacheService) { }

  // Método para obtener eventos por categorías seleccionadas
  getEventosByCategorias(categoriasSeleccionadas: number[]): Observable<Event_model[]> {
    const cachedEventos = this.cacheService.getItem<Event_model[]>(this.cacheKey);

    if (cachedEventos) {
      return of(cachedEventos); // Retorna los eventos desde el caché
    } else {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<Event_model[]>(`${this.apiUrl}category/by-categories`, categoriasSeleccionadas, { headers })
        .pipe(
          tap(eventos => {
            this.cacheService.setItem(this.cacheKey, eventos);
          })
        )
    }
  }


}
