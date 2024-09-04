import { Component } from '@angular/core';
import {FlexModule} from "@ngbracket/ngx-layout";
import {MatButtonModule} from "@angular/material/button";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FlexModule,
    MatButtonModule,
    LoginComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
