import {Position} from '../model/Position';

export interface EmployeeInfo {
  employeeCode?: string;
  employeeName?: string;
  email?: string;
  phone?: string;
  employeeAddress?: string;
  gender?: number;
  idCard?: string;
  dateOfBirth?: Date;
  employeeImg?: string;
  position?: Position;
}
