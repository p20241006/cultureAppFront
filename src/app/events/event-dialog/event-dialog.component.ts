import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
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
  @Input() event!: EventModel;       // Recibirás el evento al cual le diste click
  eventForm!: FormGroup;
  display: boolean = false;

  constructor(private fb: FormBuilder, private eventService: EventService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.eventForm = this.fb.group({
      title: [this.event?.title, Validators.required],
      description: [this.event?.description, Validators.required],
      price: [this.event?.price, Validators.required],
      company: [this.event?.company, Validators.required],
      imgEvent: [this.event?.imgEvent, Validators.required]
    });
  }

  // Mostrar el diálogo
  showDialog() {
    this.display = true;
  }

  // Actualizar evento
  updateEvent() {
    if (this.eventForm.valid) {
      const updatedEvent = { ...this.event, ...this.eventForm.value };
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
