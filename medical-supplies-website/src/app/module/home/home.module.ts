import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './component/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListHighestComponent } from './component/list-highest/list-highest.component';


@NgModule({
  declarations: [HomeComponent, ListHighestComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class HomeModule { }
