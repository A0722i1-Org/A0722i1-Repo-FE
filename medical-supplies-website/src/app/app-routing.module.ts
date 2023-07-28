import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: '', loadChildren: () => import('./module/home/home.module').then(module => module.HomeModule)},
  {
    path: 'products',
    loadChildren: () => import('./module/product/product.module').then(module => module.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./module/customer/customer.module').then(module => module.CustomerModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'carts',
    loadChildren: () => import('./module/cart/cart.module').then(module => module.CartModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'employees',
    loadChildren: () => import('./module/employee/employee.module').then(module => module.EmployeeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'accounts',
    loadChildren: () => import('./module/account/account.module').then(module => module.AccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'shipments',
    loadChildren: () => import('./module/shipment/shipment.module').then(module => module.ShipmentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'receipts',
    loadChildren: () => import('./module/receipt/receipt.module').then(module => module.ReceiptModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./module/security/security.module').then(module => module.SecurityModule),
  },
  {
    path: 'supplies',
    loadChildren: () => import('./module/supply/supply.module').then(module => module.SupplyModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
