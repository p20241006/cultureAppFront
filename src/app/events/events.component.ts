import { Component } from '@angular/core';
import {EventCarouselComponent} from "./event-carousel/event-carousel.component";
import {RouterOutlet} from "@angular/router";
import {EventHomeComponent} from "./event-home/event-home.component";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    EventCarouselComponent,
    RouterOutlet,
    EventHomeComponent
  ],
  template: `
    <app-event-home></app-event-home>
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class EventsComponent {

}
