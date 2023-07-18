import { Component, OnInit } from '@angular/core';
import {ReceiptService} from '../../service/receipt.service';
import {ReceiptType} from '../../model/ReceiptType';
import {Employee} from '../../../employee/model/Employee';
import {Supplier} from '../../model/Supplier';
import {ProductDTO} from '../../model/ProductDTO';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ReceiptDTO} from '../../model/ReceiptDTO';
import {ReceiptDetailDTO} from '../../model/ReceiptDetailDTO';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.css']
})
export class ReceiptListComponent implements OnInit {
  receiptTypes: ReceiptType[] = [];
  suppliers: Supplier[] = [];
  todayDate: string;
  employee: Employee ;
  address: string;
  productDTOs: ProductDTO[] = [];
  formReceipt: FormGroup;
  receiptDTO: ReceiptDTO ;
  listProduct: ProductDTO[] = [];
  listReceiptDetailDTO: ReceiptDetailDTO[] = [];
  constructor(private receiptService: ReceiptService) {
    // Lấy ngày hôm nay
    const today = new Date();

    // Định dạng ngày theo y-m-d
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const yyyy = today.getFullYear();

    this.todayDate = `${yyyy}-${mm}-${dd}`;
  }

  ngOnInit(): void {
    this.receiptService.findAllReceiptType().subscribe(next => {
      this.receiptTypes = next;

    });
    this.receiptService.getNameEmployee().subscribe(next => {
      this.employee = next;
    });
    this.receiptService.findAllSupplier().subscribe(next => {
      this.suppliers = next;
    });

    this.formReceipt = new FormGroup({
      // tslint:disable-next-line:radix
      receiptTypeId: new FormControl('', [Validators.required]),
      invoiceCode: new FormControl('', [Validators.required]),
      dateOfCreate: new FormControl(this.todayDate, ),
      employeeId: new FormControl('', ),
      customerId: new FormControl('', [Validators.required]),
      productId: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    });
  }

  onSelectionChange(event: any) {
    const selectedValue = +event.target.value;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.suppliers.length; i ++) {
    if (selectedValue === this.suppliers[i].customer_Id) {
          this.address = this.suppliers[i].customer_Address;
          this.receiptService.getProductByCustomerId(selectedValue).subscribe(next => {
            this.productDTOs = next;
            console.log(this.productDTOs);
          });
        }
      }
    }

  addProduct(productId: string, quantity: string) {
      this.receiptService.findProductDTOByProductId(+productId).subscribe(next => {
        next.product_Quantity = + quantity;
        this.listReceiptDetailDTO.push(new ReceiptDetailDTO(+productId, +quantity));
        this.listProduct.push(next);
        console.log(this.listReceiptDetailDTO);
      });
  }

  createReceipt() {
      const receipt = this.formReceipt.value;
      receipt.receiptDetailDTOS = [];
    // tslint:disable-next-line:prefer-for-of
      for (let i = 0 ; i < this.listReceiptDetailDTO.length ; i++ ) {
        receipt.receiptDetailDTOS.push(this.listReceiptDetailDTO[i]);
      }
      this.receiptService.saveInvoice(receipt).subscribe();
      this.listProduct = [];
      this.listReceiptDetailDTO = [];
  }

  getProduct(productId: number) {
  }
}
