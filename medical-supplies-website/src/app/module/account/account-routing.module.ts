import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddAccountComponent} from './component/add-account/add-account.component';


const routes: Routes = [
  {path: '', component: AddAccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
