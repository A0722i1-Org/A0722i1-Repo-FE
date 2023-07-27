import {ShipmentType} from './ShipmentType';
import {Employee} from '../../employee/model/Employee';
import {Customer} from '../../customer/model/Customer';

export interface Shipment {
  shipmentId?: number;
  invoiceCode?: string;
  dateOfCreate?: Date;
  note?: string;
  shipmentType?: ShipmentType;
  employee?: Employee;
  customer?: Customer;
}
