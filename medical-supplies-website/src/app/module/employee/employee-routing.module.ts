import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListEmployeeComponent} from "./list-employee/list-employee.component";
import {EmployeeUserDetailComponent} from './component/employee-user-detail/employee-user-detail.component';



const routes: Routes = [
  { path:"",component:ListEmployeeComponent},
  {path: 'detail', component: EmployeeUserDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class EmployeeRoutingModule {

}
