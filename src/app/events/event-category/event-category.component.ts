import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {CategoryService} from "./category.service";
import {Event_model} from "../event_model";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-event-category',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './event-category.component.html',
  styleUrl: './event-category.component.scss'
})
export class EventCategoryComponent implements OnInit{

  categoriasSeleccionadas: number[] = [];
  categoryService = inject(CategoryService);

  eventCategory = signal<Event_model[] | undefined>(undefined)
  public eventsCategories = computed(()=> this.eventCategory())

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.categoriasSeleccionadas = this.categoryService.getCategoriasSeleccionadas();
    this.obtenerEventos()
  }

  obtenerEventos(): void {
    this.categoryService.getEventosByCategorias(this.categoriasSeleccionadas).subscribe({
      next: (data) => {
        this.eventCategory.set(data);
        console.log(this.eventCategory)
      },
      error: (error) => {
        console.error('Error al cargar eventos:', error);  // Asegúrate de manejar los errores
      }
    });
  }
}


