import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _API_URL = 'http://localhost:8080/api/v1/product';

  constructor(private httpClient: HttpClient) {
  }

  getAllProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this._API_URL);
  }

  findByIdProductDetail(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this._API_URL + '/detail/' + id);
  }
}
