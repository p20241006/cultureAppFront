import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

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
export class ManagerComponent {

}
