import { Injectable } from '@angular/core';
<<<<<<< HEAD
import {HttpClient} from '@angular/common/http';
import {Customer} from '../model/Customer';
import {Observable} from 'rxjs';
=======
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerUserDetail} from '../model/CustomerUserDetail';
>>>>>>> edb640dcb752fd0bfc045e9a9756f4eba89dae87

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _API_URL = 'http://localhost:8080/api/v1/customer';

<<<<<<< HEAD
    constructor(private httpClient: HttpClient) { }

  createCustomer(customer: Customer): Observable<void> {
    return this.httpClient.post<void>(this._API_URL, customer);
  }

  findByIdCustomer(id: string): Observable<Customer> {
    return this.httpClient.get<Customer>(this._API_URL + '/' + id);
  }

  updateCustomer(id: string, customer: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(`${this._API_URL}/${id}`, customer);
  }

=======
  constructor(private _http: HttpClient) {
  }

  public getUserDetail(): Observable<CustomerUserDetail> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<CustomerUserDetail>(this._API_URL + '/detail', {headers});
  }
>>>>>>> edb640dcb752fd0bfc045e9a9756f4eba89dae87
}
