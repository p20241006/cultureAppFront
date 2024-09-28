import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchQuerySource = new BehaviorSubject<string>(''); // Comienza vacío
  searchQuery$ = this.searchQuerySource.asObservable();

  // Método para actualizar la búsqueda
  updateSearchQuery(query: string) {
    this.searchQuerySource.next(query);
  }
}
