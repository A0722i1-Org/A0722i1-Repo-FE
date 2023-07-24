<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerCreateComponent} from './customer-create/customer-create.component';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';


const routes: Routes = [
  {path: 'create', component : CustomerCreateComponent},
  {path: 'edit/:id', component: CustomerEditComponent}

=======
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerUserDetailComponent} from './component/customer-user-detail/customer-user-detail.component';


const routes: Routes = [
  {path: 'detail', component: CustomerUserDetailComponent}
>>>>>>> edb640dcb752fd0bfc045e9a9756f4eba89dae87
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
