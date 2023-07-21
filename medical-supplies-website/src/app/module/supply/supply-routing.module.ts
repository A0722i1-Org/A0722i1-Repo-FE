import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SupplyListComponent} from './components/supply-list/supply-list.component';


const routes: Routes = [{
  path: 'list',
  component: SupplyListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplyRoutingModule { }
