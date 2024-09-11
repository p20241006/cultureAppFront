import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  template: `
    <p>
      manager works!
    </p>
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class ManagerComponent implements OnInit{

  ngOnInit() {
    initFlowbite()
  }

}
