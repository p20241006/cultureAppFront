import {Component, OnInit, signal} from '@angular/core';
import {initFlowbite} from "flowbite";
import {AuthService} from "../auth/auth.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.scss'
})
export class NavigationMenuComponent implements OnInit{
  ngOnInit(): void {
    initFlowbite();
  }

  constructor(public authService: AuthService,) {

  }

}
