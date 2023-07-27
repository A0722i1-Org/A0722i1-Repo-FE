import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
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

  public getUserDetail(): Observable<HttpResponse<CustomerUserDetail>> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CustomerUserDetail>(this._API_URL + '/detail', {headers, observe: 'response'});
  }
}
