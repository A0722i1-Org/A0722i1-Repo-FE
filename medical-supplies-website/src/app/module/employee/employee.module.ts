import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { UpdateAndChangePasswordComponent } from './component/update-and-change-password/update-and-change-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModalChangePasswordComponent } from './component/modal-change-password/modal-change-password.component';


@NgModule({
  declarations: [UpdateAndChangePasswordComponent, ModalChangePasswordComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
