import { Component, OnInit } from '@angular/core';
import {ShipmentService} from '../../service/shipment.service';
import {Router} from '@angular/router';
import {ShipmentType} from '../../model/ShipmentType';
import {FormControl, FormGroup} from '@angular/forms';
import {CustomerDto} from '../../model/CustomerDto';



@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.css']
})
export class ShipmentListComponent implements OnInit {
  phone: string;
  customer: CustomerDto;
  notFound: boolean;
  shipmentTypes: ShipmentType[];
  // shipmentForm: FormGroup = new FormGroup({
  //   shipmentType: new FormControl()
  // });

  constructor(private shipmentService: ShipmentService, private router: Router) { }

  ngOnInit(): void {
    this.findAllShipmentType();
  }

  findAllShipmentType() {
    this.shipmentService.findAllShipmentType().subscribe(shipmentTypes => {
      this.shipmentTypes = shipmentTypes;
    });
  }

  shipment() {
  }

  onPhoneInputChange() {
    this.notFound = false;
    if (this.phone.length >= 1) {// Chỉ gọi API nếu số điện thoại có độ dài hợp lệ
      this.shipmentService.selectPhone(this.phone).subscribe(data => {
        this.customer = data;
        this.notFound = false; // Reset biến notFound khi API trả về dữ liệu
      },
        (error) => {
        console.error(error);
        this.customer = null;
        this.notFound = true; // Báo lỗi nếu số điện thoại không tồn tại
        }
    );
    }
  }
}
