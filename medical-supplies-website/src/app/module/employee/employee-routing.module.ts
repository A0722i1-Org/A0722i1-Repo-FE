import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListEmployeeComponent} from './component/list-employee/list-employee.component';
import {EmployeeUserDetailComponent} from './component/employee-user-detail/employee-user-detail.component';
import { CreateComponent } from './component/create/create.component';
import { EditComponent } from './component/edit/edit.component';
import {EmployeeUserUpdateComponent} from './component/employee-user-update/employee-user-update.component';
import {ModalChangePasswordComponent} from './component/modal-change-password/modal-change-password.component';
import {AuthGuard} from "../../auth.guard";




const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    component: ListEmployeeComponent},
  { path: 'user-detail-update',
    canActivate: [AuthGuard],
    component: EmployeeUserUpdateComponent},
  { path: 'user-change-password',
    canActivate: [AuthGuard],
    component: ModalChangePasswordComponent},
  {path: 'detail',
    canActivate: [AuthGuard],
    component: EmployeeUserDetailComponent},
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CreateComponent
  },
  {
    path: 'update/:id',
    canActivate: [AuthGuard],
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class EmployeeRoutingModule {

}
