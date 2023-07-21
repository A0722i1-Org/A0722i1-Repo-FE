import { Employee } from './../model/Employee';
import { Position } from './../model/Position';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmptyExpr } from '@angular/compiler';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _API_URL = 'http://localhost:8080/api/v1/employee';
  employees : Employee [] = []

  constructor(private httpClient :  HttpClient ) {
  }
  getEmployeeWithNameAndDobAndPos(name : String,dateOfBirth : String,positionName : String):Observable<any[]>{
    // @ts-ignore
    return this.httpClient.get(this._API_URL+"?name"+name+"&date="+dateOfBirth+"&pos="+positionName)
  }
   // @ts-ignore
  getEmployeeById(id : Number):Observable<Employee>{
    return this.httpClient.get(this._API_URL+"/"+id)
  }
  deleteByID(id : Number):Observable<any>{
    return this.httpClient.delete(this._API_URL+"/delete/"+id)
  }
  // @ts-ignore
  getAllPos():Observable<any>{
    return  this.httpClient.get("http://localhost:8080/api/positions");
  }
}
