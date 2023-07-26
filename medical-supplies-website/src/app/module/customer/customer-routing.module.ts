import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerCreateComponent} from './component/customer-create/customer-create.component';
import {CustomerEditComponent} from './component/customer-edit/customer-edit.component';
import {CustomerUserDetailComponent} from './component/customer-user-detail/customer-user-detail.component';


const routes: Routes = [
  {path: 'create', component : CustomerCreateComponent},
  {path: 'edit/:id', component: CustomerEditComponent},
  {path: 'detail', component: CustomerUserDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
