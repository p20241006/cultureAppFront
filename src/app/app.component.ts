import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {NgOptimizedImage} from "@angular/common";
import {NavigationMenuComponent} from "./navigation-menu/navigation-menu.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, RouterLink, MatButtonModule, NgOptimizedImage, NavigationMenuComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cultureAppFront';

  constructor(iconRegistry: MatIconRegistry, sanitizer:DomSanitizer) {
    iconRegistry.addSvgIcon(
      'chilli',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/chilli.svg'),
    )
  }
}
