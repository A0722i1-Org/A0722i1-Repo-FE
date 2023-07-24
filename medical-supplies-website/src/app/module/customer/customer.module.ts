import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
<<<<<<< HEAD
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CustomerCreateComponent,
    CustomerEditComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,

  ]
=======
import { CustomerUserDetailComponent } from './component/customer-user-detail/customer-user-detail.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CustomerUserDetailComponent],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        ReactiveFormsModule
    ]
>>>>>>> edb640dcb752fd0bfc045e9a9756f4eba89dae87
})
export class CustomerModule { }
