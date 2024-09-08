import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManagerHomeComponent} from "./manager-home/manager-home.component";
import {authGuard} from "../auth/Auth.guard";
import {Role} from "../auth/auth.enum";
import {UserManagementComponent} from "./user-management/user-management.component";

const routes: Routes = [
  {
    path: 'home',
    component: ManagerHomeComponent,
    canActivate: [authGuard],
    data: { expectedRole: Role.Manager },
  },
  {
    path: 'users',
    component: UserManagementComponent,
    canActivate: [authGuard],
    data: { expectedRole: Role.Manager },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
