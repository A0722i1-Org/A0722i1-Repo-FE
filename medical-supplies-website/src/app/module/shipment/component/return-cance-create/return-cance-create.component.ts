import {Component, OnInit} from '@angular/core';
import {Product} from '../../../product/model/Product';
import {ShipmentService} from '../../service/shipment.service';
import {ProductDto} from '../../model/ProductDto';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-return-cance-create',
  templateUrl: './return-cance-create.component.html',
  styleUrls: ['./return-cance-create.component.css']
})
export class ReturnCanceCreateComponent implements OnInit {
  products: Product[];
  productDto: ProductDto[];

  constructor(public shipmentService: ShipmentService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.findAllProductShipmentCreate();
  }

  /* Hiển thị danh sách chọn vật tư*/
  findAllProductShipmentCreate() {
    this.shipmentService.findAllProduct().subscribe(data => {
      this.productDto = data;
    });
  }

  /*Chọn check box để thêm qua list tạm*/
  chonChekBox(p: ProductDto) {
    if (p.chon) {
      this.shipmentService.addShipmentProductDetailDto(p);
    } else {
      this.shipmentService.removeShipmentProductDetailDto(p);
    }
  }

  /*Thêm qua list tạm*/
  create() {
    const shipmentItems = this.shipmentService.getShipmentDetailDto();
    // Sử dụng danh sách tạm shipmentItems ở đây để thực hiện các thao tác bạn cần với các sản phẩm đã chọn
    console.log(shipmentItems);
    // Tiến hành reset lại danh sách tạm
    // this.shipmentService.clearShipmentItems();
    this.router.navigate(['/shipments/return']);
  }
}
