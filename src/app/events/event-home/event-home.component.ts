import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { EventInfoComponent } from "../event-info/event-info.component";
import { EventRecomendationComponent } from "../event-recomendation/event-recomendation.component";



@Component({
  selector: 'app-event-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,
    RouterLink, EventInfoComponent, EventRecomendationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './event-home.component.html',
  styleUrl: './event-home.component.scss'
})
export class EventHomeComponent implements OnInit {

ngOnInit(): void {
  initFlowbite();
}

constructor(private router: Router) {}

goToEventInfo(){
  this.router.navigate(['events/event-info']);
}



}
