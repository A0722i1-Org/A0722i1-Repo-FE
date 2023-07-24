import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeUserDetailComponent} from './component/employee-user-detail/employee-user-detail.component';


const routes: Routes = [
  {path: 'detail', component: EmployeeUserDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
