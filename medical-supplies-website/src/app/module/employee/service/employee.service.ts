import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeUserDetail} from '../model/EmployeeUserDetail';
import {TokenStorageService} from '../../security/service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _API_URL = 'http://localhost:8080/api/v1/employee';

  constructor(private _http: HttpClient,
              private _tokenStorageService: TokenStorageService) {
  }

  public getUserDetail(): Observable<HttpResponse<EmployeeUserDetail>> {
    const token = this._tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<EmployeeUserDetail>(this._API_URL + '/detail', {headers, observe: 'response'});
  }
}
