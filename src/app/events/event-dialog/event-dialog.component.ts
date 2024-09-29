import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  input,
  OnInit,
  Output
} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EventService} from "../services/event.service";
import {MessageService} from "primeng/api";
import {DialogModule} from "primeng/dialog";
import {ToastModule} from "primeng/toast";
import {EventModel} from "../model/event.model";
import {ChipsModule} from "primeng/chips";
import {ButtonModule} from "primeng/button";
import {InputTextareaModule} from "primeng/inputtextarea";


@Component({
  selector: 'app-event-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    ToastModule,
    ChipsModule,
    ButtonModule,
    InputTextareaModule
  ],
  templateUrl: './event-dialog.component.html',
  styleUrl: './event-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDialogComponent implements OnInit {

  eventForm!: FormGroup;
  display: boolean = false;
  @Input() eventOwner!: EventModel;

  constructor(private fb: FormBuilder, private eventService: EventService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      company: ['', Validators.required],
      imgEvent: ['', Validators.required]
    });
  }

  openEditDialog() {
    this.display = true;
    // Llenar el formulario con los datos del evento
    this.eventForm.patchValue({
      title: this.eventOwner.title,
      description: this.eventOwner.description,
      price: this.eventOwner.price,
      company: this.eventOwner.company,
      imgEvent: this.eventOwner.imgEvent
    });
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const dialogElement = document.getElementById('appEventDialog');
    if (this.display && dialogElement && !dialogElement.contains(event.target as Node)) {
      this.display = false;
    }
  }

  // Actualizar evento
  updateEvent() {
    if (this.eventForm.valid) {
      const updatedEvent = { ...this.eventOwner, ...this.eventForm.value };
      this.eventService.updateEvent(updatedEvent).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Evento actualizado exitosamente' });
          this.display = false;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el evento' });
        }
      });
    }
  }
}
