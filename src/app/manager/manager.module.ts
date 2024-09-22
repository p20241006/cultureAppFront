import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import {UserService} from "../user/user/user.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ],
  providers: [UserService],
})
export class ManagerModule { }
