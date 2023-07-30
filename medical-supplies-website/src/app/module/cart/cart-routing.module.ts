import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartListComponent} from './component/cart-list/cart-list.component';
import {AuthGuard} from '../../auth.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: CartListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
