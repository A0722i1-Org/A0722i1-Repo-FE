import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import {HttpClientModule} from '@angular/common/http';
import {EmployeeUserDetailComponent} from './component/employee-user-detail/employee-user-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';




@NgModule({
  declarations: [EmployeeUserDetailComponent,ListEmployeeComponent,CreateComponent, EditComponent,],
  exports: [],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
],})

export class EmployeeModule {
}
