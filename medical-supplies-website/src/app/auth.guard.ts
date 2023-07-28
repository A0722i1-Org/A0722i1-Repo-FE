import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from './module/security/service/token-storage.service';
import {AuthService} from './module/security/service/auth.service';
import Swal from 'sweetalert2';

const urlLogin: string[] = ['/login'];
const urlUsers: string[] = ['/carts', '/customers/detail'];
const urlSales: string[] = [
  '/shipments/shipment',
  '/shipments/shipment',
  '/receipts',
  '/employees/detail'
];
const urlAccountants: string[] = [
  '/shipments/shipment',
  '/shipments/shipment',
  '/receipts',
  '/employees/detail',
  '/customer/detail',
  '/supplies'
];

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      const userRoles = this.tokenStorageService.getRole();
      if (userRoles === 'ROLE_ADMIN') {
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
          icon: 'info',
          title: 'Đồ ngốc, bạn không có quyền truy cập chức năng này',
          showConfirmButton: false,
          timer: 999
        });
        return this.router.parseUrl('/');
      }
    }
    return this.router.createUrlTree(['/login'], {queryParams: {returnUrl: state.url}});
  }

}
