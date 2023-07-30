import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListEmployeeComponent} from './component/list-employee/list-employee.component';
import {EmployeeUserDetailComponent} from './component/employee-user-detail/employee-user-detail.component';
import { CreateComponent } from './component/create/create.component';
import { EditComponent } from './component/edit/edit.component';
import {EmployeeUserUpdateComponent} from './component/employee-user-update/employee-user-update.component';
import {ModalChangePasswordComponent} from './component/modal-change-password/modal-change-password.component';




const routes: Routes = [
  { path: '', component: ListEmployeeComponent},
  { path: 'user-detail-update', component: EmployeeUserUpdateComponent},
  { path: 'user-change-password', component: ModalChangePasswordComponent},
  {path: 'detail', component: EmployeeUserDetailComponent},
  {
    path: 'create', component: CreateComponent
  },
  {
    path: 'update/:id', component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class EmployeeRoutingModule {

}
