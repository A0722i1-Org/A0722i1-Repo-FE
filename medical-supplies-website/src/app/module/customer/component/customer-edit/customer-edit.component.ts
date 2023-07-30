import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerType} from '../../model/CustomerType';
import {CustomerTypeService} from '../../service/customer-type.service';
import {CustomerService} from '../../service/customer.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customerFormEdit: FormGroup;
  id: string;
  customerTypes: CustomerType [] = [];
  inputImage: any = null;
  maxSize = false;
  imgSrc: string;


  constructor(private customerTypeService: CustomerTypeService,
              private customerService: CustomerService,
              private activatedRoute: ActivatedRoute,
              private storage: AngularFireStorage,
              private router: Router) { }

  ngOnInit(): void {
    this.customerTypeService.getAllCustomerType().subscribe((data) => {
      this.customerTypes = data;
    });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      console.log(this.id);
      this.customerService.findByIdCustomer(this.id).subscribe((customerEdit) => {
        console.log(customerEdit);
        this.imgSrc = customerEdit.customerImg;
        this.customerFormEdit = new FormGroup({
          customerId: new FormControl(customerEdit.customerId),
          customerCode : new FormControl(customerEdit.customerCode, [Validators.required, Validators.pattern('^KH-\\d{4}$')]),
          name: new FormControl(customerEdit.name, [Validators.required, Validators.maxLength(50),
            Validators.minLength(3), Validators.pattern('^(?:[A-Z][a-zÀ-ỹ]*(?: [A-Z][a-zÀ-ỹ]*)+)$')]),
          phone: new FormControl(customerEdit.phone, [Validators.required, Validators.pattern('^(09|08)\\d{8}$')]),
          gender: new FormControl(customerEdit.gender, [Validators.required]),
          dateOfBirth: new FormControl(customerEdit.dateOfBirth, Validators.required),
          idCard: new FormControl(customerEdit.idCard, [Validators.required, Validators.pattern('^\\s*\\d{12}\\s*$')]),
          email: new FormControl(customerEdit.email, [Validators.required, Validators.minLength(6),
            Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9_.+-]+@gmail.com+$')]),
          customerAddress: new FormControl(customerEdit.customerAddress,
            [Validators.required, Validators.maxLength(100), Validators.minLength(10)
              , Validators.pattern('^[^!@#$%^&*()_+<>?\'\"{}\\`~|/\\\\]+$')]),
          customerImg: new FormControl(customerEdit.customerImg, Validators.required),
          customerType: new FormControl(customerEdit.customerType, Validators.required),
          account: new FormControl(customerEdit.account),
          cart: new FormControl(customerEdit.cart),
          enable: new FormControl(customerEdit.enable),
        });
      }, (error) => {
        console.log(error);
      }, () => {
        console.log(this.customerFormEdit);
      });
    });
  }

  editCustomer(id: string) {
    const customerTypeId: number = this.customerFormEdit.get('customerType').
      value.customerTypeId; // Lấy giá trị id từ form, kiểu dữ liệu là number

    this.customerTypeService.findByIdCustomerType(customerTypeId).subscribe(
      (data) => {
        this.customerFormEdit.patchValue({
          type: data
        });
        console.log(data);
      },
      () => {
      },
      () => {
        if (this.inputImage != null && this.maxSize !== true ) {
          const nameImg = formatDate(new Date(), 'dd-MM-yyyy_hh:mm:ss:a_', 'en-US') + this.inputImage.name;
          const fileRef = this.storage.ref(nameImg);
          this.storage.upload(nameImg, this.inputImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                this.customerFormEdit.patchValue({employeeImg: url});
                console.log('Change');
                console.log(this.customerFormEdit.value);
                this.customerService.updateCustomer(id, this.customerFormEdit.value).subscribe(
                  () => {
                    console.log( this.customerFormEdit);
                  },
                  () => {

                  },
                  () => {
                    this.router.navigateByUrl('/customers');
                  }
                );
              });
            })
          ).subscribe();
        } else {
          console.log('No change');
          console.log(this.customerFormEdit.value);
          this.customerService.updateCustomer(id, this.customerFormEdit.value).subscribe(
            () => {
              console.log( this.customerFormEdit);
            },
            () => {

            },
            () => {
              this.router.navigateByUrl('/customers');
            }
          );        }

      }



    );
    console.log(this.customerFormEdit.value);
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
