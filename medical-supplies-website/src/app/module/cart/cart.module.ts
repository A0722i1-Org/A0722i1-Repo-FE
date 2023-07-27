import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CartListComponent} from './component/cart-list/cart-list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CartModule { }
