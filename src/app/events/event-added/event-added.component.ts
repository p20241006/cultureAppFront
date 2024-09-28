import {Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EventService} from "../services/event.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {AsyncPipe, CurrencyPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Button, ButtonDirective} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {DropdownModule} from "primeng/dropdown";
import {CardModule} from "primeng/card";
import {MatButton} from "@angular/material/button";
import {TagModule} from "primeng/tag";
import {RouterLink} from "@angular/router";
import {BehaviorSubject, Observable, switchMap} from "rxjs";
import {EventModel, EventoResponse} from "../model/event.model";
import {map, startWith} from "rxjs/operators";
import {MatPaginator} from "@angular/material/paginator";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {EventDialogComponent} from "../event-dialog/event-dialog.component";


@Component({
  selector: 'app-event-added',
  standalone: true,
  imports: [
    NgIf,
    ButtonDirective,
    ReactiveFormsModule,
    ChipsModule,
    DropdownModule,
    NgForOf,
    CardModule,
    CurrencyPipe,
    AsyncPipe,
    Button,
    MatButton,
    TagModule,
    RouterLink,
    NgStyle,
    MatPaginator,
    MessagesModule,
    NgClass,
    ToastModule,
    DialogModule,
    EventDialogComponent
  ],
  templateUrl: './event-added.component.html',
  styleUrl: './event-added.component.scss'
})
export class EventAddedComponent implements OnInit {

  eventoForm: FormGroup;
  mostrarFormulario = false;

  selectedEvent!: EventModel;

  @ViewChild('appEventDialog') eventDialogComponent!: EventDialogComponent;


  regiones = [
    { id: 1, nombre: 'LIMA' },
    { id: 2, nombre: 'CUSCO' },
  ];

  categorias = [
    { id: 1, nombre: 'Conciertos' },
    { id: 2, nombre: 'Ferias' },
    { id: 3, nombre: 'Museos' },
    { id: 4, nombre: 'Turismo' },
    { id: 5, nombre: 'Cine' },
    { id: 6, nombre: 'Talleres' },
    { id: 7, nombre: 'Teatro' },
    { id: 8, nombre: 'Festivales' },
    { id: 9, nombre: 'Deportes' },
    { id: 10, nombre: 'Arte y Cultura' },
    { id: 11, nombre: 'Seminarios y Conferencias' },
    { id: 12, nombre: 'Eventos Familiares' },
    { id: 13, nombre: 'Otros' },
  ];

  eventos: any[] = []; // Almacenar los eventos para mostrar en cards

  constructor(
    private eventoService: EventService,
    private messageService: MessageService,
    private fb: FormBuilder,

  ) {
    // Inicializamos el formulario reactivo con validaciones
    this.eventoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      price: [0, Validators.required],
      imgEvent: ['', Validators.required],
      shareable: [true],
      categoryId: [null, Validators.required],
      regionId: [null, Validators.required],
      company: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEvents(this.currentPage, this.pageSize);

  }

  // Método para agregar evento
  agregarEvento(): void {
    if (this.eventoForm.valid) {
      this.eventoService.addEvento(this.eventoForm.value).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Evento agregado correctamente',
          });

          // Agregar el evento al arreglo para mostrarlo en las cards
          this.eventos.push(response);
          this.eventoForm.reset();
          this.mostrarFormulario = false; // Ocultar el formulario después de agregar el evento
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo agregar el evento',
          });
        }
      );
    }
  }

  eventsOwner$: Observable<EventModel[]> = new Observable();
  totalElements: number = 0;       // Total de eventos
  pageSize: number = 12;            // Tamaño de la página, 6 *cards* por página
  currentPage: number = 0;         // Página actual
  pageSizeOptions: number[] = [5, 10, 20, 100];  // Opciones de tamaño para la paginación

  onEventClick(event: EventModel) {
    this.selectedEvent = event;
    this.eventDialogComponent.showDialog(); // Llamar al método showDialog del diálogo
  }


  // Método para cargar los eventos
  loadEvents(page: number, size: number) {
    this.eventsOwner$ = this.eventoService.getAllEventsOwner(page, size).pipe(
      map((response: EventoResponse) => {
        this.totalElements = response.totalElements;
        return response.content;
      })
    );
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEvents(this.currentPage, this.pageSize);
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

  event = {
    rate: 0 // Ejemplo de valor de rate
  };

  isLiked = false;

  // Función para devolver un arreglo de estrellas
  getStars(rate: number): { filled: boolean }[] {
    const totalStars = 5; // Total de estrellas a mostrar
    return Array.from({ length: totalStars }, (_, index) => ({
      filled: index < rate // Determina si la estrella debe ser dorada o gris
    }));
  }
  likedEvents: { [key: number]: boolean } = {}; // Almacena los likes de cada evento por su ID

  // Función para alternar el estado de "like" de un evento
  toggleLike(eventId: number) {
    // Si el evento ya está en el estado de liked, lo cambiamos
    if (this.likedEvents[eventId]) {
      this.likedEvents[eventId] = false;
    } else {
      this.likedEvents[eventId] = true;
    }
  }

  // Verifica si un evento está liked
  isEventLiked(eventId: number): boolean {
    return this.likedEvents[eventId];
  }


  display: boolean = false; // Controla la visibilidad del diálogo
  selectedEventId: number | null = null;

  confirmDelete(eventId: number) {
    this.selectedEventId = eventId;
    this.display = true; // Muestra el diálogo de confirmación
  }

  onConfirm() {
    if (this.selectedEventId !== null) {
      this.eventoService.removeEvent(this.selectedEventId).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Evento eliminado exitosamente' });
          this.display = false; // Oculta el diálogo
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error, por favor comuníquese con el administrador' });
          this.display = false; // Oculta el diálogo
        }
      });
    }
  }

  onReject() {
    this.display = false; // Oculta el diálogo al rechazar
  }


}
