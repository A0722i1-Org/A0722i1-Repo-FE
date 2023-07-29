import {Position} from './Position';

export interface EmployeeInfo {
  employeeCode?: string;
  employeeName?: string;
  email?: string;
  phone?: string;
  employeeAddress?: string;
  gender?: boolean;
  idCard?: string;
  dateOfBirth?: Date;
  employeeImg?: string;
  position?: Position;
}
