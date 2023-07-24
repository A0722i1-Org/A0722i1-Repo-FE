import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _API_URL = 'http://localhost:8080/api/v1/product';

  constructor() { }
}
