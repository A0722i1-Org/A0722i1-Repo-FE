import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerUserDetailComponent} from './component/customer-user-detail/customer-user-detail.component';
import {CustomerListComponent} from './customer-list/customer-list.component';


const routes: Routes = [
  {path: 'create', component : CustomerCreateComponent},
  {path: 'edit/:id', component: CustomerEditComponent},
  {path: 'detail', component: CustomerUserDetailComponent}
  {path: '', component: CustomerListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
