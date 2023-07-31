import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SupplyListComponent} from './components/supply-list/supply-list.component';
import {AuthGuard} from "../../auth.guard";


const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard],
  component: SupplyListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplyRoutingModule { }
