import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShipmentListComponent} from './component/shipment-list/shipment-list.component';
import {ShipmentCreateComponent} from './component/shipment-create/shipment-create.component';


const routes: Routes = [
  {path: '', component: ShipmentListComponent},
  {path: 'create', component: ShipmentCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentRoutingModule { }
