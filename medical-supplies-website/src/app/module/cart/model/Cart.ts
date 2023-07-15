import {City} from '../../customer/model/City';
import {Customer} from '../../customer/model/Customer';

export interface Cart {
  cartId: number;
  receiverName: string;
  receiverAddress: string;
  receiverCity: City;
  receiverEmail: string;
  customer: Customer;
}
