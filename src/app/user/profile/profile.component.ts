import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import { Role } from '../../auth/auth.enum'
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {IUSState} from "./data";
import {UiService} from "../../common/ui.service";
import {UserService} from "../user/user.service";
import {AuthService} from "../../auth/auth.service";
import {filter, tap} from "rxjs/operators";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {IUser} from "../user/user";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  Role = Role
  formGroup!: FormGroup
  states$!: Observable<IUSState[]>
  userError = ''
  currentUserId!: string
  constructor(
    private formBuilder: FormBuilder,
    private uiService: UiService,
    private userService: UserService,
    private authService: AuthService
  ) {}
  private destroyRef = inject(DestroyRef)
  ngOnInit() {
    this.buildForm()
    this.authService.currentUser$.pipe(
      filter((user) => user !== null),
      tap((user) => {
        this.currentUserId = user._id
        this.buildForm(user)
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
  }
  private get currentUserRole() {
    return this.authService.authStatus$.value.userRole
  }
  buildForm(user?: IUser) {}

}
