import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { EmployeeComponent } from './employee.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CreateComponent, EditComponent, EmployeeComponent],
    exports: [
        CreateComponent,
        EditComponent
    ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
