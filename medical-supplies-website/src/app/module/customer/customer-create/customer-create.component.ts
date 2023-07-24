import {Component, OnInit} from '@angular/core';
import {CustomerTypeService} from '../service/customer-type.service';
import {CustomerService} from '../service/customer.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerType} from '../model/CustomerType';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  customerFormCreate: FormGroup;
  customerTypes: CustomerType [] = [];


  constructor(private customerTypeService: CustomerTypeService,
              private customerService: CustomerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.customerTypeService.getAllCustomerType().subscribe((data) => {
      this.customerTypes = data;
    });
    this.customerFormCreate = new FormGroup({
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
    console.log(this.customerFormCreate.value);
  }

  createCustomer() {
    this.customerService.createCustomer(this.customerFormCreate.value).subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.router.navigateByUrl('customer/list');
      }
    );
    console.log(this.customerFormCreate.value);

  }

}
