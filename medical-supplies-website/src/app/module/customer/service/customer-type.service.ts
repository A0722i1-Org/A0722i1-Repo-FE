import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerType} from '../model/CustomerType';

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {
  private _API_URL = 'http://localhost:8080/api/v1/customer-type';


  constructor( private httpClient: HttpClient) { }
  getAllCustomerType( ): Observable<CustomerType[]> {
    return this.httpClient.get<CustomerType[]>(this._API_URL);
  }
  findByIdCustomerType(id: string): Observable<CustomerType> {
    return this.httpClient.get<CustomerType>(this._API_URL + '/' + id);
  }

}
