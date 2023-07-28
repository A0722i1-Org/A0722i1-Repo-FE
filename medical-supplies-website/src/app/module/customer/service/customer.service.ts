import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Customer} from '../model/Customer';
import {Observable} from 'rxjs';
import {CustomerUserDetail} from '../model/CustomerUserDetail';
import {TokenStorageService} from '../../security/service/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _API_URL = 'http://localhost:8080/api/v1/customer';

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }
  createCustomer(customer: Customer): Observable<void> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(this._API_URL + '/create', customer, {headers});
  }

  findByIdCustomer(id: string): Observable<Customer> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(this._API_URL + '/' + id);
    return this.http.get<Customer>(this._API_URL + '/' + id, {headers});
  }

  updateCustomer(id: string, customer: Customer): Observable<Customer> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Customer>(this._API_URL + '/edit/' + id, customer, {headers});
  }


  public getUserDetail(): Observable<HttpResponse<CustomerUserDetail>> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CustomerUserDetail>(this._API_URL + '/detail', {headers, observe: 'response'});
  }
}
