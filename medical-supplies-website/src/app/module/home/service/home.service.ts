import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductMain} from '../model/product-main';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private API_PRO_MAIN = 'http://localhost:8080/api/v1/home';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<any> {
    return this.httpClient.get<any>(this.API_PRO_MAIN );
  }

    searchByName(keyword: string): Observable<any> {
    return this.httpClient.get<any[]>(`${this.API_PRO_MAIN}/search-name${keyword}`);
  }

  // searchByCate(keyword: number, currentpage: number): Observable<any> {
  //   console.log(`${this.API_PRO_MAIN}/search-cate?page=${currentpage}&${keyword}`);
  //   return this.httpClient.get<any[]>(`${this.API_PRO_MAIN}/search-cate?categoryId=${keyword}`);
  // }

  searchByCate(keyword: number): Observable<any> {
    console.log(`${this.API_PRO_MAIN}/search-cate?${keyword}`);
    return this.httpClient.get<any[]>(`${this.API_PRO_MAIN}/search-cate?categoryId=${keyword}`);
  }

  getProductHighest(): Observable<any> {
    return this.httpClient.get<any>(this.API_PRO_MAIN + '/highest');
  }


}
