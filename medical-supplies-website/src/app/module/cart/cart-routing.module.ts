import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartListComponent} from './component/cart-list/cart-list.component';
import {PaymentSuccessComponent} from './component/payment-success/payment-success.component';


const routes: Routes = [
  {
    path: '',
    component: CartListComponent
  },
  {
    path: 'payment',
    component: PaymentSuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
