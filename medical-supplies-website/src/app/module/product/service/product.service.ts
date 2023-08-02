import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/Product';
import {TokenStorageService} from '../../security/service/token-storage.service';
import {CartDetail} from '../../cart/model/CartDetail';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _API_URL = 'http://localhost:8080/api/v1/product';
  private products: Product[] = [];

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }

  findByIdProductDetail(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this._API_URL + '/detail/' + id);
  }

  getCartItems(): Product[] {
    return this.products;
  }

  addToCart(productId: number): Observable<CartDetail[]> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<CartDetail[]>(`${this._API_URL}/add/${productId}`, {headers});
  }

  clearCart(): void {
    this.products = [];
  }
}
