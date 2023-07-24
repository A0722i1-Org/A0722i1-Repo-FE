import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerUserDetail} from '../model/CustomerUserDetail';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _API_URL = 'http://localhost:8080/api/v1/customer';

  constructor(private _http: HttpClient) {
  }

  public getUserDetail(): Observable<CustomerUserDetail> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<CustomerUserDetail>(this._API_URL + '/detail', {headers});
  }
}
