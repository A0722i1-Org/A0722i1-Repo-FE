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

  findAll(currentpage: number): Observable<any> {
    return this.httpClient.get<any>(this.API_PRO_MAIN + '?page=' + `${currentpage}`);
  }

    searchByName(keyword: string, currentpage: number): Observable<any> {
    return this.httpClient.get<any[]>(`${this.API_PRO_MAIN}/search-name?page=${currentpage}&${keyword}`);
  }

  searchByCate(keyword: number, currentpage: number): Observable<any> {
    console.log(`${this.API_PRO_MAIN}/search-cate?page=${currentpage}&${keyword}`);
    return this.httpClient.get<any[]>(`${this.API_PRO_MAIN}/search-cate?page=${currentpage}&categoryId=${keyword}`);
  }

  getProductHighest(): Observable<any> {
    return this.httpClient.get<any>(this.API_PRO_MAIN + '/highest');
  }
}
