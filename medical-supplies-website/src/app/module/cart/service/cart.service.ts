import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CartWithDetail} from '../model/cart-with-detail';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../../security/service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _API_URL = 'http://localhost:8080/api/v1/cart';

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }

  getByUsername(): Observable<CartWithDetail> {
    const token = this.tokenStorageService.getToken();
    debugger;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get<CartWithDetail>(`${this._API_URL}`, {headers});
  }

  updateCartWithDetail(cartWithDetail: CartWithDetail): Observable<CartWithDetail> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.put<CartWithDetail>(`${this._API_URL}`, cartWithDetail, {headers});
  }

}
