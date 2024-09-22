import { AsyncPipe } from '@angular/common'
import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatStepperModule } from '@angular/material/stepper'
import { MatToolbarModule } from '@angular/material/toolbar'
import { FlexModule } from '@ngbracket/ngx-layout/flex'
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs'
import { filter, first, map, startWith, tap } from 'rxjs/operators'
import { $enum } from 'ts-enum-util'

import { Role } from '../../auth/auth.enum'
import { AuthService } from '../../auth/auth.service'
import { BaseFormDirective } from '../../common/base-form.class'
import { CacheService } from '../../common/cache.service'
import { UiService } from '../../common/ui.service'
import {
  EmailValidation,
  OptionalTextValidation,
  RequiredTextValidation,
  USAZipCodeValidation,
} from '../../common/validations'

import { IName, IUser, User } from '../user/user'
import { UserService } from '../user/user.service'
import {IPEState, USStateFilter} from './data'
import {FieldErrorDirective} from "../../user-controls/field-error.directive";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatStepperModule,
    ReactiveFormsModule,
    FlexModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FieldErrorDirective,
    MatRadioModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    AsyncPipe,
  ],
})
export class ProfileComponent
  extends BaseFormDirective<IUser>
  implements OnInit, OnDestroy
{
  private readonly cache = inject(CacheService)

  private get currentUserRole() {
    return this.authService.authStatus$.value.userRole
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private uiService: UiService,
    private route: ActivatedRoute
  ) {
    super()
  }


  get dateOfBirth() {
    return this.formGroup.get('dateOfBirth')?.value || this.now
  }

  get age() {
    return this.now.getFullYear() - this.dateOfBirth.getFullYear()
  }

  Role = Role

  now = new Date()
  minDate = new Date(
    this.now.getFullYear() - 100,
    this.now.getMonth(),
    this.now.getDate()
  )

  states$: Observable<IPEState[]> | undefined
  userError = ''
  readonly nameInitialData$ = new BehaviorSubject<IName>({
    first: '',
    middle: '',
    last: '',
  })

  private readonly destroyRef = inject(DestroyRef)
  currentUserId!: number | string

  ngOnInit() {
    this.formGroup = this.buildForm()
    if (this.route.snapshot.data['user']) {
      this.patchUser(this.route.snapshot.data['user'])
    } else {
      combineLatest(
        [this.loadFromCache(),
          this.authService.currentUser$]
      )
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          filter(
            ([cachedUser, me]) =>
              cachedUser != null || me != null
          ),
          tap(
            ([cachedUser, me]) =>
              this.patchUser(cachedUser || me)
          )
        )
        .subscribe()
    }
  }

  patchUser(user: IUser) {
    if (user) {
      this.currentUserId = user._id
      this.patchUpdatedData(user)
      this.nameInitialData$.next(user.fullName)
    }
  }

  ngOnDestroy() {
    this.deregisterAllForms()
  }

  buildForm(initialData?: IUser): FormGroup {
    const user = initialData
    this.currentUserId = user?._id || ''
    const form = this.formBuilder.group({
      email: [
        {
          value: user?.email || '',
          disabled: this.currentUserRole !== Role.Manager,
        },
        EmailValidation,
      ],
      name: null,
      role: [
        {
          value: user?.role || '',
          disabled: this.currentUserRole !== Role.Manager,
        },
        Validators.required,
      ],
      //dateOfBirth: [user?.dateOfBirth || '', Validators.required],
    })

    this.states$ = form.get('address.state')?.valueChanges.pipe(
      startWith(''),
      map((value) => USStateFilter(value as string))
    )

    return form
  }


  async save(form: FormGroup) {
    this.userService
      .updateUser(this.currentUserId, form.value)
      .pipe(first())
      .subscribe({
        next: (res: IUser) => {
          this.patchUser(res)
          this.uiService.showToast('Updated user')
        },
        error: (err: string) => (this.userError = err),
      })
  }


  private loadFromCache(): Observable<User | null> {
    let user: User | null = null
    try {
      user = this.cache.getItem<User>('draft-user', User.Build)
      if (user) {
        this.uiService.showToast('Loaded data from cache')
      }
    } catch (err) {
      this.clearCache()
    }
    return of(user)
  }

  clearCache() {
    this.cache.removeItem('draft-user')
  }
}
