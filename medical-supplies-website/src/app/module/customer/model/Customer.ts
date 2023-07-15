import {Account} from '../../account/model/Account';
import {CustomerType} from './CustomerType';
import {Cart} from '../../cart/model/Cart';

export interface Customer {
  customerId?: number;
  name?: string;
  phone?: string;
  gender?: boolean;
  dateOfBirth?: Date;
  idCard?: string;
  customerAddress?: string;
  customerImg?: string;
  customerType?: CustomerType;
  cart?: Cart;
  account?: Account;
  enable?: boolean;
}
