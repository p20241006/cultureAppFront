import {Component,OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {AuthService} from "./auth/auth.service";
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, RouterLink, MatButtonModule, NgOptimizedImage, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'cultureAppFront';

  constructor(
    public authService: AuthService,
  ) {}

  ngOnInit() {
    initFlowbite();
  }
}
