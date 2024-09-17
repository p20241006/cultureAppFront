import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-event-recomendation',
  standalone: true,
  imports: [],
  templateUrl: './event-recomendation.component.html',
  styleUrl: './event-recomendation.component.scss'
})
export class EventRecomendationComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
  
}
