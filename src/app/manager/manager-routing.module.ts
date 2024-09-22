import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { Role } from '../auth/auth.enum'
import { userResolver } from '../user/user/user.resolve'
import { ViewUserComponent } from '../user/view-user/view-user.component'
import { ManagerComponent } from './manager.component'
import { ManagerHomeComponent } from './manager-home/manager-home.component'
import { UserManagementComponent } from './user-management/user-management.component'
import { UserTableComponent } from './user-table/user-table.component'
import {authGuard} from "../auth/Auth.guard";

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: ManagerHomeComponent,
        canActivate: [authGuard],
        data: {
          expectedRole: Role.Manager,
        },
      },
      {
        path: 'users',
        component: UserManagementComponent,
        children: [
          { path: '', component: UserTableComponent, outlet: 'master' },
          {
            path: 'user',
            component: ViewUserComponent,
            outlet: 'detail',
            resolve: {
              user: userResolver,
            },
          },
        ],
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        data: {
          expectedRole: Role.Manager,
        },
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
