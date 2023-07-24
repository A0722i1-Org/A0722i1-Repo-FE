import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from './employee-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {EmployeeUserDetailComponent} from './component/employee-user-detail/employee-user-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [EmployeeUserDetailComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule {
}
