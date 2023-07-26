import { Employee } from './../model/Employee';
import {Injectable} from '@angular/core';
import {EmployeeUserDetail} from '../model/EmployeeUserDetail';
import {TokenStorageService} from "../../security/service/token-storage.service";
import {EmployeeInfo} from "../dto/EmployeeInfo";
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _API_URL = 'http://localhost:8080/api/v1/employee';

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }


  getEmployeeWithNameAndDobAndPos(name: string, dateOfBirth: string, positionName: string): Observable<Employee[]> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // @ts-ignore
    return this.httpClient.get(this._API_URL + "?name=" + name + "&date=" + dateOfBirth + "&pos=" + positionName, { headers })
  }

  // @ts-ignore
  getEmployeeById(id: Number): Observable<Employee> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(this._API_URL + "/" + id,{headers})
  }

  deleteByID(id: Number): Observable<any> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete(this._API_URL + "/delete/" + id,{headers})
  }

  // @ts-ignore
  getAllPos(): Observable<any> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get("http://localhost:8080/api/v1/position",{headers});
  }

  public getUserDetail(): Observable<EmployeeUserDetail> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<EmployeeUserDetail>(this._API_URL + '/detail', {headers});
    // tslint:disable-next-line:variable-name
  }

  saveEmployee(employeeInfor: EmployeeInfo): Observable<EmployeeInfo> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<EmployeeInfo>('http://localhost:8080/api/v1/employee', employeeInfor,{headers});
  }

  updateEmployee(employee: EmployeeInfo, id: number): Observable<any> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.put<any>('http://localhost:8080/api/v1/employee/' + id, employee,{headers});
  }

}
