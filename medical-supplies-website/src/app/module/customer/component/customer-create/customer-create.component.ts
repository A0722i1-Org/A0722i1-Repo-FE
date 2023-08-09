import {Component, OnInit} from '@angular/core';
import {CustomerTypeService} from '../../service/customer-type.service';
import {CustomerService} from '../../service/customer.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerType} from '../../model/CustomerType';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Customer} from '../../model/Customer';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  customerFormCreate: FormGroup;
  customerTypes: CustomerType [] = [];
  customer: Customer [] = [];
   inputImage: any;
  imgSrc: any = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
  maxSize: any;

  constructor(private customerTypeService: CustomerTypeService,
              private customerService: CustomerService,
              private storage: AngularFireStorage,
              private router: Router) {
  }

  ngOnInit(): void {
    this.customerTypeService.getAllCustomerType().subscribe((data) => {
      this.customerTypes = data;
    });
    this.customerFormCreate = new FormGroup({
      customerId: new FormControl(),
      customerCode : new FormControl('', [Validators.required, Validators.pattern('^KH-\\d{4}$')]),
      name: new FormControl('', [Validators.required, Validators.maxLength(50),
        Validators.minLength(3), Validators.pattern('^(?:[A-Z][a-zÀ-ỹ]*(?: [A-Z][a-zÀ-ỹ]*)+)$')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^(09|08)\\d{8}$')]),
      gender: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', Validators.required),
      idCard: new FormControl('', [Validators.required, Validators.pattern('^\\d{12}$')]),
      email: new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.maxLength(30),  Validators.pattern('^[a-zA-Z0-9_.+-]+@gmail.com+$')]),
      customerAddress: new FormControl('', [Validators.required, Validators.maxLength(100),
        Validators.minLength(10), Validators.pattern('^[^!@#$%^&*()_+<>?\'\"{}\\`~|/\\\\]+$')]),
      customerImg: new FormControl('', Validators.required),
      customerType: new FormControl('', Validators.required),
      account: new FormControl(),
      cart: new FormControl(),
      enable: new FormControl(),
    });
    console.log(this.customerFormCreate.value);
  }

  createCustomer() {
    const nameImg = formatDate(new Date(), 'dd-MM-yyyy_hh:mm:ss:a_', 'en-US') + this.inputImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.inputImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.customerFormCreate.value.customerImg = url;
          this.customerService.createCustomer(this.customerFormCreate.value).subscribe(next => {
              this.router.navigateByUrl('customers').then(() => {
                Swal.fire('Thành công',
                  'Đã thêm khách hàng thành công',
                  'success');
              });
            },
            (error) => {
              Swal.fire('Lỗi',
                'Không thêm khách hàng thành công',
                'success');
              console.log(error);
            },
            () => {
              }
            );
        });
      })
    ).subscribe(
      () => {
      },
      (error) => {
        Swal.fire('Lỗi',
          'Không thêm khách hàng thành công',
          'success');
        console.log(error);
      },
      () => {
      }
    );
    console.log(this.customerFormCreate.value);

  }

  selectImg(event: any) {
    this.inputImage = event.target.files[0];
    if (this.inputImage.size > 1048576 && this.inputImage != null) {
      this.maxSize = true;
      event.target.value = null;
      this.inputImage = null;
    } else if (this.inputImage) {
      this.maxSize = false;
      const reader = new FileReader();
      reader.readAsDataURL(this.inputImage);
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
      };
    }
  }


}
