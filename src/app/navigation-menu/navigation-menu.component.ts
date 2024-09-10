import {Component, OnInit, signal} from '@angular/core';
import {initFlowbite} from "flowbite";
import {AuthService} from "../auth/auth.service";
import {AsyncPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink
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
