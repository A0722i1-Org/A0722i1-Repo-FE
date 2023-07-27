import {Account} from '../../account/model/Account';
import {Position} from './Position';

export interface Employee {
  employeeId?: number;
  employeeName?: string;
  gender?: boolean;
  dateOfBirth?: Date;
  employeeAddress?: string;
  employeeImg?: string;
  salary?: number;
  phone?: string;
  position?: Position;
  account?: Account;
  enable?: boolean;
}
