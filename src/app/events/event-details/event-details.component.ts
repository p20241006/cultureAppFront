import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EventService } from "../event.service";
import { Event_model } from "../event_model";
import { Observable } from "rxjs";
import {RatingService} from "../services/rating.service";
import {Button} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {RatingModule} from "primeng/rating";
import {AsyncPipe} from "@angular/common";


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  standalone: true,
  imports: [
    Button,
    FormsModule,
    DialogModule,
    RatingModule,
    AsyncPipe
  ],
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  route = inject(ActivatedRoute);
  eventService = inject(EventService);
  ratingService = inject(RatingService); // Inyecta el servicio de Rating
  eventDetail$: Observable<Event_model> = new Observable();
  idEvento: number = 0;
  value!: number; // Valor del rating (puntuación)
  comment: string = 'Sin commentarios'; // Comentario del usuario
  visible: boolean = false; // Control de visibilidad del diálogo

  constructor() {}

  ngOnInit(): void {
    // Obtener ID del evento desde la URL
    this.idEvento = Number(this.route.snapshot.params['id']);
    // Obtener los detalles del evento a través del servicio
    this.eventDetail$ = this.eventService.getEventById(this.idEvento);
  }

  // Mostrar el diálogo de puntuación
  showDialog() {
    this.visible = true;
  }

  // Enviar la puntuación al servicio
  guardarPuntuacion(): void {
    if (this.value) {
      // Llamar al servicio para enviar la puntuación y el comentario
      this.ratingService.enviarPuntuacion(this.idEvento, this.value, this.comment).subscribe({
        next: (response) => {
          console.log('Puntuación enviada con éxito', response);
          this.visible = false; // Cerrar el diálogo después de guardar
        },
        error: (error) => {
          console.error('Error al enviar la puntuación', error);
        }
      });
    }
  }

  // Mapeo del ID de la categoría al nombre de la categoría
  obtenerCategoriaPorId(idCategoria: number): string {
    const categorias: { id: number; nombre: string }[] = [
      { id: 1, nombre: "Conciertos" },
      { id: 2, nombre: "Ferias" },
      { id: 3, nombre: "Museos" },
      { id: 4, nombre: "Turismo" },
      { id: 5, nombre: "Cine" },
      { id: 6, nombre: "Talleres" },
      { id: 7, nombre: "Teatro" },
      { id: 8, nombre: "Festivales" },
      { id: 9, nombre: "Deportes" },
      { id: 10, nombre: "Arte y Cultura" },
      { id: 11, nombre: "Seminarios y Conferencias" },
      { id: 12, nombre: "Eventos Familiares" },
      { id: 94, nombre: "Otros" },
    ];

    // Buscar la categoría por id
    const categoria = categorias.find(cat => cat.id === idCategoria);
    return categoria ? categoria.nombre : 'Categoría no encontrada';
  }

}
