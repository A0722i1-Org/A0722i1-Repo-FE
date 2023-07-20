import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './component/cart-list/cart-list.component';


@NgModule({
  declarations: [CartListComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
