import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Position} from '../../model/Position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private _API_URL = 'http://localhost:8080/api/v1/position';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Position[]> {
    return this.httpClient.get<Position[]>(this._API_URL);
  }



}
