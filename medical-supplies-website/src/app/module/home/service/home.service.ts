import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductMain} from '../model/product-main';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private API_PRO_MAIN = 'http://localhost:8080/api/v1/product';

  constructor(private httpClient: HttpClient) {
  }

  findAll(currentpage: number): Observable<any> {
    return this.httpClient.get<any>(this.API_PRO_MAIN + '/home?page=' + `${currentpage}`);
  }
}
