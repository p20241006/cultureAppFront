import {Component, OnInit} from '@angular/core';
import {FlexModule} from "@ngbracket/ngx-layout";
import {MatButtonModule} from "@angular/material/button";
import {LoginComponent} from "../login/login.component";
import {AuthService} from "../auth/auth.service";
import {combineLatest} from "rxjs";
import {Router} from "@angular/router";
import {filter, tap} from "rxjs/operators";

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
export class HomeComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.login('manager@test.com', '12345678')
    combineLatest([
      this.authService.authStatus$, this.authService.currentUser$
    ])
      .pipe(
        filter(([authStatus, user]) =>
          authStatus.isAuthenticated && user?._id !== ''
        ),
        tap(([authStatus, user]) => {
          this.router.navigate(['/manager'])
        })
      )
      .subscribe()
  }



}
