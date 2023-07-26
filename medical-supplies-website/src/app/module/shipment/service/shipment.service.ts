import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShipmentType} from '../model/ShipmentType';
import {TokenStorageService} from '../../security/service/token-storage.service';
import {Customer} from '../../customer/model/Customer';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private _API_URL = 'http://localhost:8080/api/v1/shipment/';

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService) { }

  findAllShipmentType(): Observable<ShipmentType[]> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<ShipmentType[]>(this._API_URL + 'shipment-type', {headers});
  }

  selectPhone(phone: string): Observable<Customer> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(this._API_URL + 'phone/' + phone , {headers});
  }
}
