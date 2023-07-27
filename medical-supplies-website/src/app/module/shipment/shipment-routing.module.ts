import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShipmentListComponent} from './component/shipment-list/shipment-list.component';
import {ShipmentCreateComponent} from './component/shipment-create/shipment-create.component';
import {ReturnCanceComponent} from './component/return-cance/return-cance.component';
import {ReturnCanceCreateComponent} from './component/return-cance-create/return-cance-create.component';



const routes: Routes = [
  {path: 'shipment', component: ShipmentListComponent},
  {path: 'shipment/create', component: ShipmentCreateComponent},
  {path: 'return', component: ReturnCanceComponent},
  {path: 'return/create', component: ReturnCanceCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentRoutingModule { }
