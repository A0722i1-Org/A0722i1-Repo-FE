import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerUserDetailComponent } from './component/customer-user-detail/customer-user-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {CustomerEditComponent} from './component/customer-edit/customer-edit.component';
import {CustomerCreateComponent} from './component/customer-create/customer-create.component';


@NgModule({
  declarations: [CustomerUserDetailComponent, CustomerListComponent, CustomerEditComponent, CustomerCreateComponent] ,
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CustomerModule { }
