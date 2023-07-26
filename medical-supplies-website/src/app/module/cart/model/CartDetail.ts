import {Cart} from './Cart';
import {Product} from '../../product/model/Product';

export interface CartDetail {
  cartDetailId?: number;
  product?: Product;
  quantity?: number;
  status?: boolean;
  cart?: Cart;
}
