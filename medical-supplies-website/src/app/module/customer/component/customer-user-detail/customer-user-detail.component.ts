import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {CustomerUserDetail} from '../../model/CustomerUserDetail';
import {CustomerService} from '../../service/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-user-detail',
  templateUrl: './customer-user-detail.component.html',
  styleUrls: ['./customer-user-detail.component.css']
})
export class CustomerUserDetailComponent implements OnInit {
  private _customerUserDetail: CustomerUserDetail;
  private _mainForm: FormGroup;

  constructor(private _customerService: CustomerService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.mainForm = new FormGroup({
      customerName: new FormControl(''),
      phone: new FormControl(''),
      idCard: new FormControl(''),
      dateOfBirth: new FormControl(''),
      customerAddress: new FormControl(''),
      accountEmail: new FormControl('')
    });

    this._customerService.getUserDetail().subscribe(data => {
      this.customerUserDetail = data;
      this.customerUserDetail.dateOfBirth = new DatePipe('en-US').transform(new Date(this.customerUserDetail.dateOfBirth), 'yyyy-MM-dd');
      this.mainForm.patchValue(this.customerUserDetail);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi...',
        text: 'Bạn không có quyền truy cập!',
        confirmButtonColor: '#55efc4'
      });
      this._router.navigateByUrl('/accounts/login');
    });
  }

  public showUpdateComponent(): void {
    this._router.navigateByUrl('/customers/user-detail-update');
  }

  // Getters/Setters Begin.
  get customerUserDetail(): CustomerUserDetail {
    return this._customerUserDetail;
  }

  set customerUserDetail(value: CustomerUserDetail) {
    this._customerUserDetail = value;
  }

  get mainForm(): FormGroup {
    return this._mainForm;
  }

  set mainForm(value: FormGroup) {
    this._mainForm = value;
  }

  // Getters/Setters End.
}
