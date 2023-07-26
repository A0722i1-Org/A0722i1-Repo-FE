import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/Product';
import {TokenStorageService} from '../../security/service/token-storage.service';

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
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Product>(this._API_URL + '/detail/' + id);
  }

  getCartItems(): Product[] {
    return this.products;
  }

  addToCart(item: Product): void {
    const existingItem = this.products.find((data) => data.productId === item.productId);

    if (existingItem) {
      existingItem.productQuantity += item.productQuantity;
    } else {
      this.products.push(item);
    }
  }

  clearCart(): void {
    this.products = [];
  }
}
