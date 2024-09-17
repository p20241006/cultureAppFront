import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {EventHomeComponent} from "./event-home/event-home.component";
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    
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
