import {Injectable} from '@angular/core';
import {Employee} from '../model/Employee';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ChangePasswordDto} from '../model/ChangePasswordDto';
import {TokenStorageService} from '../../security/service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _API_URL_EMPLOYEE = 'http://localhost:8080/api/v1/employee';
  private _API_URL_ACCOUNT_CHANGE_PASSWORD = 'http://localhost:8080/api/v1/account/change-password';

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }

  updateEmployeeDetail(employee: Employee): Observable<any> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.patch<Employee>(this._API_URL_EMPLOYEE + '/' + 'update-employee', employee, {headers});
  }

  findByEmployeeEqualUsername(): Observable<Employee> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Employee>(this._API_URL_EMPLOYEE + '/' + 'user-detail-update', {headers});
  }

  changePassword(changePasswordDto: ChangePasswordDto): Observable<any> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.patch<Account>(this._API_URL_ACCOUNT_CHANGE_PASSWORD, changePasswordDto, {headers});
  }
}
