import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {CustomerUserDetail} from '../../model/CustomerUserDetail';
import {CustomerService} from '../../service/customer.service';
import Swal from 'sweetalert2';
import {tap} from 'rxjs/operators';

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

    this._customerService.getUserDetail().pipe(
      tap(response => {
        if (response.status === 202 || response.status === 404) {
          this._handlingError();
        }
      })
    ).subscribe(response => {
      this.customerUserDetail = response.body;
      this.customerUserDetail.dateOfBirth = new DatePipe('en-US').transform(new Date(this.customerUserDetail.dateOfBirth), 'yyyy-MM-dd');
      this.mainForm.patchValue(this.customerUserDetail);
    }, error => {
        this._handlingError();
    });
  }

  public showUpdateComponent(): void {
    this._router.navigateByUrl('/customers/user-detail-update');
  }

  // Error handling
  private _handlingError() {
    Swal.fire({
      icon: 'error',
      title: 'Lỗi...',
      text: 'Bạn không có quyền truy cập!',
      confirmButtonColor: '#55efc4'
    });
    this._router.navigateByUrl('/');
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
