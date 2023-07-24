import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerUserDetailComponent} from './component/customer-user-detail/customer-user-detail.component';


const routes: Routes = [
  {path: 'detail', component: CustomerUserDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
