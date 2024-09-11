import {Component, OnInit} from '@angular/core';
import {EventCarouselComponent} from "./event-carousel/event-carousel.component";
import {RouterOutlet} from "@angular/router";
import {EventHomeComponent} from "./event-home/event-home.component";
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    EventCarouselComponent,
    RouterOutlet,
    EventHomeComponent
  ],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class EventsComponent implements OnInit{
  ngOnInit() {
    initFlowbite()
  }

}
