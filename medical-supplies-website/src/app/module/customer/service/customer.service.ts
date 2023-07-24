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

  constructor(private _http: HttpClient,
              private _tokenStorageService: TokenStorageService) {
  }

  public getUserDetail(): Observable<HttpResponse<CustomerUserDetail>> {
    const token = this._tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<CustomerUserDetail>(this._API_URL + '/detail', {headers, observe: 'response'});
  }
}
