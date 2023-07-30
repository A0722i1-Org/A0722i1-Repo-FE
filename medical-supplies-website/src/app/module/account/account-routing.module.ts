import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddAccountComponent} from './component/add-account/add-account.component';
import {AuthGuard} from '../../auth.guard';


const routes: Routes = [
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: AddAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
