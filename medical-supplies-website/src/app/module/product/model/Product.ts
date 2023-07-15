import {Category} from './Category';
import {ProductInfo} from './ProductInfo';
import {Customer} from '../../customer/model/Customer';

export interface Product {
  productId?: number;
  productCode?: string;
  productName?: string;
  productPrice?: number;
  productQuantity?: number;
  productImg?: string;
  expireDate?: Date;
  category?: Category;
  productInfo?: ProductInfo;
  customer?: Customer;
  enable?: boolean;
}
