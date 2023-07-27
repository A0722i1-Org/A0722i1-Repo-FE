import {Employee} from '../../employee/model/Employee';

export interface Receipt {
  receiptId?: number;
  invoiceCode?: string;
  dateOfCreate?: Date;
  note?: string;
  employee?: Employee;
}
