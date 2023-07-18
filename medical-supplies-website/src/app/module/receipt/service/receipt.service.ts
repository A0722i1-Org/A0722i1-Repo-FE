import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReceiptType} from '../model/ReceiptType';
import {TokenStorageService} from '../../security/service/token-storage.service';
import {Employee} from '../../employee/model/Employee';
import {Supplier} from '../model/Supplier';
import {ProductDTO} from "../model/ProductDTO";
import {ReceiptDTO} from "../model/ReceiptDTO";

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private _API_URL = 'http://localhost:8080/api/v1/receipt/';

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService) { }

  findAllReceiptType(): Observable<ReceiptType[]> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}` );
    return this.httpClient.get<ReceiptType[]>(this._API_URL + 'receipt-type', {headers});
  }
  getNameEmployee(): Observable<Employee> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}` );
    return this.httpClient.get<Employee>(this._API_URL + 'name-employee', {headers});
  }
  findAllSupplier(): Observable<Supplier[]> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}` );
    return this.httpClient.get<Supplier[]>(this._API_URL + 'supplier', {headers});
  }
  getProductByCustomerId(customerId: number): Observable<ProductDTO[]> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}` );
    return this.httpClient.get<ProductDTO[]>(this._API_URL + 'product/' + customerId, {headers});
  }
  findProductDTOByProductId(productID: number): Observable<ProductDTO> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}` );
    return this.httpClient.get<ProductDTO>(this._API_URL + 'productDTO/' + productID, {headers});
  }
  saveInvoice(receiptDTO): Observable<ReceiptDTO> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<ReceiptDTO>(this._API_URL + 'create', receiptDTO , {headers});
  }
}
