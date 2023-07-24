import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerUserDetailComponent } from './component/customer-user-detail/customer-user-detail.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CustomerUserDetailComponent],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        ReactiveFormsModule
    ]
})
export class CustomerModule { }
