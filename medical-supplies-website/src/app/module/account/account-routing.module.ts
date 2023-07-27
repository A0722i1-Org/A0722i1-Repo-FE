import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AccountLoginComponent} from './component/account-login/account-login.component';


const routes: Routes = [
  {path: 'login', component: AccountLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
