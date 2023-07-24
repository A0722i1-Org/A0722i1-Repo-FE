import {Account} from '../../account/model/Account';
import {Position} from './Position';

export interface Employee {
  employeeId?: number;
  employeeCode?: number;
  employeeName?: string;
  gender?: number;
  dateOfBirth?: string;
  email?: string;
  phone?: string;
  idCard?: string;
  employeeAddress?: string;
  employeeImg?: string;
  salary?: number;
  position?: Position;
  account?: Account;
  isEnable?: boolean;
}
