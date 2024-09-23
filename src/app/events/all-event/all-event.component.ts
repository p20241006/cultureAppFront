import {Component, inject, OnInit} from '@angular/core';
import {Event_model} from "../event_model";
import {EventService} from "../event.service";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {TagModule} from "primeng/tag";
import {AsyncPipe, NgForOf, NgStyle} from "@angular/common";
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {Observable} from "rxjs";

@Component({
  selector: 'app-all-event',
  standalone: true,
  imports: [
    TagModule,
    NgStyle,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
    Button,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './all-event.component.html',
  styleUrl: './all-event.component.scss'
})
export class AllEventComponent implements OnInit{

  events$: Observable<Event_model[]> = new Observable();
  totalElements: number = 0; // Total de elementos para el paginador
  pageSize: number = 10;
  currentPage: number = 0;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.getEvents(this.currentPage, this.pageSize);
  }

  getEvents(page: number, size: number): void {
    this.events$ = this.eventService.getAllEvents(page, size);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getEvents(this.currentPage, this.pageSize);
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
