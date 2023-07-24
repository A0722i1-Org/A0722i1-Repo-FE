import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../../model/Employee';
import {Observable} from 'rxjs';
import {EmployeeInfo} from '../../dto/EmployeeInfo';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _API_URL = 'http://localhost:8080/api/v1/employee';

  constructor(private httpClient: HttpClient) {
  }

  saveEmployee(employeeInfor: EmployeeInfo): Observable<EmployeeInfo> {
    return this.httpClient.post<EmployeeInfo>('http://localhost:8080/api/v1/employee', employeeInfor);
  }

  updateEmployee(employee: EmployeeInfo, id: number): Observable<any> {
    return this.httpClient.put<any>('http://localhost:8080/api/v1/employee/' + id, employee);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>('http://localhost:8080/api/v1/employee/' + id);
  }

  getAllEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this._API_URL);
  }
}
