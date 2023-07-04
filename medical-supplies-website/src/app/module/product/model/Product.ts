import {Customer} from '../../customer/model/Customer';

export interface Product {
  productId: number;
  productCode: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productImg: string;
  expireDate: Date;
  customer: Customer;
}
