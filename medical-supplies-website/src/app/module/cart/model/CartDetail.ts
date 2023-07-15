import {Cart} from './Cart';
import {Product} from '../../product/model/Product';

export interface CartDetail {
  cartDetailId?: number;
  quantity?: number;
  product?: Product;
  status?: boolean;
  cart?: Cart;
}
