import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../model/Customer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _API_URL = 'http://localhost:8080/api/v1/customer';

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

}
