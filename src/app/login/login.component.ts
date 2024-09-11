import {Component, inject, OnInit} from '@angular/core';
import {RegisterComponent} from "../register/register.component";
import {FlexModule} from "@ngbracket/ngx-layout";
import {MatCardModule} from "@angular/material/card";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatGridListModule} from "@angular/material/grid-list";
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {catchError, filter, first, tap} from "rxjs/operators";
import {combineLatest} from "rxjs";
import {AuthMode, Role} from "../auth/auth.enum";
import {EmailValidation, PasswordValidation} from "../common/validations";
import {UiService} from "../common/ui.service";
import {environment} from "../../environments/environment";
import {FieldErrorDirective} from "../user-controls/field-error/field-error.component";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FlexModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FieldErrorDirective,
    MatButtonModule,
    MatExpansionModule,
    MatGridListModule,
    RegisterComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  private readonly formBuilder = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)
  private readonly uiService = inject(UiService);

  loginForm!: FormGroup
  loginError = ''
  roles = Object.keys(Role)
  authMode = environment.authMode
  AuthMode = AuthMode

  get redirectUrl() {
    return this.route.snapshot.queryParamMap.get('redirectUrl') || ''
  }

  ngOnInit() {
    this.authService.logout()
    this.buildLoginForm()
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    })
  }

  async login(submittedForm: FormGroup) {
    this.authService
      .login(submittedForm.value.email, submittedForm.value.password)
      .pipe(catchError((err) => (this.loginError = err)))

    combineLatest([this.authService.authStatus$, this.authService.currentUser$])
      .pipe(
        filter(([authStatus, user]) => authStatus.isAuthenticated),
        first(),
        tap(([authStatus, user]) => {
          this.uiService.showToast(
            `Welcome ${authStatus.userId}! Role: ${authStatus.userRole}`
          )
          this.router.navigate([
            this.redirectUrl || this.homeRoutePerRole(user.role as Role),
          ])
        })
      )
      .subscribe()
  }


  private homeRoutePerRole(role: Role) {
    switch (role) {
      case Role.User:
        return '/events'
      case Role.adminEvents:
        return '/events'
      case Role.Manager:
        return '/manager'
      default:
        return '/user/profile'
    }
  }
}
