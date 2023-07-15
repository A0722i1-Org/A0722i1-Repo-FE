import {City} from './City';
import {Account} from '../../account/model/Account';
import {CustomerType} from './CustomerType';

export interface Customer {
  customerId: number;
  customerName: string;
  phone: string;
  customerAddress: string;
  customerProvince: City;
  customerImg: string;
  customerType: CustomerType;
  account: Account;
}
