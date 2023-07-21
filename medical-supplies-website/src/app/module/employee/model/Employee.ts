import {Account} from '../../account/model/Account';
import {Position} from './Position';

export interface Employee {
  employeeId?: number;
  employeeCode?:string;
  employeeName?: string;
  gender?: number;
  dateOfBirth?: Date;
  employeeAddress?: string;
  employeeImg?: string;
  salary?: number;
  position?: Position;
  account?: Account;
  isEnable?: boolean;
  email?:string;
  phone?:string;
  idCard?:string;
}
