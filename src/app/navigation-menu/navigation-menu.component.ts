import {Component, OnInit, signal} from '@angular/core';
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.scss'
})
export class NavigationMenuComponent implements OnInit{
  ngOnInit(): void {
    initFlowbite();
  }

}
