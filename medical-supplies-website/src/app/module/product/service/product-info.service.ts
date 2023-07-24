import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductInfo} from '../model/ProductInfo';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoService {

  private _API_URL = 'http://localhost:8080/api/v1/product-info';

  constructor(private httpClient: HttpClient) {
  }

  getAllProductInfo(): Observable<ProductInfo[]> {
    return this.httpClient.get<ProductInfo[]>(this._API_URL);
  }

  findByIdProductInfo(id: number): Observable<ProductInfo> {
    return this.httpClient.get<ProductInfo>(this._API_URL + '/detail/' + id);
  }
}
