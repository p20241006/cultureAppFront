import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {CategoryService} from "./category.service";
import {EventModel} from "../model/event.model";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Button} from "primeng/button";
import {CarouselModule} from "primeng/carousel";
import {MatButton} from "@angular/material/button";
import {PrimeTemplate} from "primeng/api";
import {TagModule} from "primeng/tag";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-event-category',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    Button,
    CarouselModule,
    MatButton,
    NgOptimizedImage,
    PrimeTemplate,
    TagModule,
    RouterLink
  ],
  templateUrl: './event-category.component.html',
  styleUrl: './event-category.component.scss'
})
export class EventCategoryComponent implements OnInit{

  categoriasSeleccionadas: number[] = [];
  categoryService = inject(CategoryService);
  responsiveOptions: any[] | undefined;

  eventCategory = signal<EventModel[] | undefined>(undefined)
  public eventsCategories = computed(()=> this.eventCategory())

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.categoriasSeleccionadas = this.categoryService.getCategoriasSeleccionadas();
    this.obtenerEventos()
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1
      }
    ];
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

  // @ts-ignore
  getSeverity(status: string) {
    switch (status) {
      case 'joinnus':
        return 'success';
      case 'teleticket':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  }
}


