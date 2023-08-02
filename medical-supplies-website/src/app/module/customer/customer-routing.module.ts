import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerCreateComponent} from './component/customer-create/customer-create.component';
import {CustomerEditComponent} from './component/customer-edit/customer-edit.component';
import {CustomerUserDetailComponent} from './component/customer-user-detail/customer-user-detail.component';
import {CustomerListComponent} from './component/customer-list/customer-list.component';
import {AuthGuard} from "../../auth.guard";


const routes: Routes = [
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CustomerCreateComponent
  },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    component: CustomerEditComponent
  },
  {
    path: 'detail',
    canActivate: [AuthGuard],
    component: CustomerUserDetailComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: CustomerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
