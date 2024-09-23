import {Component,OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {AuthService} from "./auth/auth.service";
import {initFlowbite} from "flowbite";

//PrimeNg
import { PrimeNGConfig} from "primeng/api";
import {NgxUiLoaderModule} from "ngx-ui-loader";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, RouterLink, MatButtonModule, NgOptimizedImage, AsyncPipe, NgxUiLoaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'cultureAppFront';

  constructor(
    public authService: AuthService,
    private primeNGConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.primeNGConfig.ripple = false;
    this.primeNGConfig.setTranslation({
      accept: 'Aceptar',
      reject: 'Cancelar',
      choose: 'Seleccionar',
      lt: 'Menor que',
      lte: 'Menor o igual que',
      gt: 'Mayor que',
      gte: 'Mayor o igual que',
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'JUeves','Viernes','Spabado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
      monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dec'],
    })
    this.primeNGConfig.zIndex ={
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100
    }
    initFlowbite();
  }
}
