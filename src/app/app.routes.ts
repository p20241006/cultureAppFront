import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LoginComponent} from "./login/login.component";
import {authGuard} from "./auth/Auth.guard";
import {Role} from "./auth/auth.enum";
import {RegisterComponent} from "./register/register.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login/:redirectUrl', component: LoginComponent },
  {
    path: 'manager',
    loadChildren: () => import('./manager/manager.module').then(m=> m.ManagerModule),
    canMatch: [authGuard],
    data: {
      expectedRole: Role.Manager,
    }
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canMatch: [authGuard]
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then((m) => m.EventsModule),
    canMatch: [authGuard]
  },

  { path: '**', component: PageNotFoundComponent },
];
