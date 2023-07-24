import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeUserDetail} from '../model/EmployeeUserDetail';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _API_URL = 'http://localhost:8080/api/v1/employee';

  constructor(private _http: HttpClient) {
  }

  public getUserDetail(): Observable<EmployeeUserDetail> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<EmployeeUserDetail>(this._API_URL + '/detail', {headers});
  }
}
