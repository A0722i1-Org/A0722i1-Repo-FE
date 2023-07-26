import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReceiptListComponent} from './component/receipt-list/receipt-list.component';


const routes: Routes = [
  {path: '', component: ReceiptListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiptRoutingModule { }
