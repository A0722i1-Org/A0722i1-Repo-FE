import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipmentRoutingModule } from './shipment-routing.module';
import { ShipmentListComponent } from './component/shipment-list/shipment-list.component';
import { ShipmentCreateComponent } from './component/shipment-create/shipment-create.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    ShipmentRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ShipmentListComponent, ShipmentCreateComponent]
})
export class ShipmentModule { }
