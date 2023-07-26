import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  UpdateAndChangePasswordComponent
} from './component/update-and-change-password/update-and-change-password.component';

const routes: Routes = [
  {path: 'user-detail-update', component: UpdateAndChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
