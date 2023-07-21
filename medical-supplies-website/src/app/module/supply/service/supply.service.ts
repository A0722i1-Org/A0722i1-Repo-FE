import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { TokenStorageService } from '../../security/service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {

  private  _API_URL = 'http://localhost:8080/api/v1/supply/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    const token : string = this.tokenStorageService.getToken();
    const headers : HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Supply[]>(this._API_URL, {headers});
  }

  search(keyword: string): Observable<any> {
    return this.http.get<Supply[]>(`${this._API_URL}${keyword}`);
  }
}
