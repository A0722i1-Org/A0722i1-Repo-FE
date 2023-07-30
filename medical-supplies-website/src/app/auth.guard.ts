import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from './module/security/service/token-storage.service';
import Swal from 'sweetalert2';

const urlUsers: string[] = [
  '/carts',
  '/customers/detail',
  '/products/detail'
];
const urlSales: string[] = [
  '/shipments/shipment',
  '/employees/detail',
  '/products/detail'
];
const urlAccountants: string[] = [
  '/shipments/shipment',
  '/shipments/return',
  '/receipts',
  '/employees/detail',
  '/customer/detail',
  '/supplies',
  '/products/detail',
  '/customers'
];

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.tokenStorageService.getToken();
    if (token !== null) {
      const userRoles = this.tokenStorageService.getRole();
      if (userRoles === 'ROLE_ADMIN' && !state.url.includes('/carts')) {
        return true;
      } else if (userRoles === 'ROLE_USER' && urlUsers.indexOf(state.url) !== -1) {
        return true;
      } else if (userRoles === 'ROLE_SALE' && urlSales.indexOf(state.url) !== -1) {
        return true;
      } else if (userRoles === 'ROLE_ACCOUNTANT' && urlAccountants.indexOf(state.url) !== -1) {
        return true;
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Bạn không có quyền truy cập chức năng này',
          showConfirmButton: false,
          timer: 1500
        });
        return this.router.parseUrl('/');
      }
    }

    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Bạn phải đăng nhập để sử dụng chức năng này!',
      showConfirmButton: false,
      timer: 1500
    });
    return this.router.createUrlTree(['/login'], {queryParams: {returnUrl: state.url}});
  }
}
