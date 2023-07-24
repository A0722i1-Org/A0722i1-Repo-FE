import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerType} from '../model/CustomerType';
import {CustomerTypeService} from '../service/customer-type.service';
import {CustomerService} from '../service/customer.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customerFormEdit: FormGroup;
  id: string ;
  customerTypes: CustomerType [] = [];
  constructor(private customerTypeService: CustomerTypeService,
              private customerService: CustomerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.customerTypeService.getAllCustomerType().subscribe((data) => {
      this.customerTypes = data;
    });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.customerService.findByIdCustomer(this.id).subscribe((customerEdit) => {
        this.customerFormEdit = new FormGroup({
          id: new FormControl(),
          customerCode : new FormControl('', [Validators.required, Validators.pattern('^KH-\\d{4}$')]),
          name: new FormControl('', [Validators.required, Validators.pattern('^(?:[A-Z][a-zÀ-ỹ]*(?: [A-Z][a-zÀ-ỹ]*)+)$')]),
          phone: new FormControl('', [Validators.required, Validators.pattern('^(09|08)\\d{8}$')]),
          gender: new FormControl('', [Validators.required]),
          dateOfBirth: new FormControl('', Validators.required),
          idCard: new FormControl('', [Validators.required, Validators.pattern('^\\d{12}$')]),
          email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@gmail.com+$')]),
          customerAddress: new FormControl('', [Validators.required, Validators.pattern('^[^!@#$%^&*()_+<>?\'\"{}\\`~|/\\\\]+$')]),
          customerImg: new FormControl('', Validators.required),
          customerType: new FormControl('', Validators.required),
          account: new FormControl(),
          cart: new FormControl(),
          enable: new FormControl(),
        });
      });
    });
  }

  editCustomer(id: string) {
    this.customerTypeService.findByIdCustomerType(this.customerFormEdit.get('customerType').value).subscribe(
      (data) => {
        this.customerFormEdit.patchValue({
          type: data
        });
      },
      () => {
      },
      () => {
        this.customerService.updateCustomer(id, this.customerFormEdit.value).subscribe(
          () => {
          },
          () => {

          },
          () => {
            // this.toast.success("Chỉnh sửa khách hàng thành công");
            this.router.navigateByUrl('customer/list');
          }
        );
      }
    );
  }

}
