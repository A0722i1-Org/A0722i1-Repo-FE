import {Cart} from './Cart';
import {Product} from '../../product/model/Product';

export interface CartDetail {
  cartDetailId: number;
  quantity: number;
  isEnable: boolean;
  cart: Cart;
  product: Product;
}
