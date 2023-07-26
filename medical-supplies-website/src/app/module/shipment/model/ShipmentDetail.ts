import {Product} from '../../product/model/Product';
import {Shipment} from './Shipment';

export interface ShipmentDetail {
  shipmentDetailId?: number;
  quantity?: number;
  product?: Product;
  shipment?: Shipment;
}
