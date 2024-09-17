import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-event-favorite',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './event-favorite.component.html',
  styleUrl: './event-favorite.component.scss'
})
export class EventFavoriteComponent implements OnInit{
  ngOnInit(): void {
    initFlowbite();
  }
}
