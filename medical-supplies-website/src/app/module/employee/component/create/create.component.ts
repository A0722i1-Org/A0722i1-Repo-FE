import {Component} from '@angular/core';
import {Position} from '../../model/Position';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeInfo} from '../../model/EmployeeInfo';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {Title} from '@angular/platform-browser';
import {formatDate} from '@angular/common';
import {Employee} from '../../model/Employee';
import {finalize} from 'rxjs/operators';
import {EmployeeService} from '../../service/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  positions: Position[] = [];
  employeeCreateForm: FormGroup;
  employeeCreate: EmployeeInfo;
  inputImage: any = null;
  maxSize = false;
  employees: Employee[] = [];
  employeeCode: string;
  imgSrc: string;
  inquiredImg = false;

  constructor(private employeeService: EmployeeService, private router: Router,
              private storage: AngularFireStorage, private title: Title) {
    this.employeeService.getAllPos().subscribe(next => {
      this.positions = next;
      this.employeeService.getAllEmployee().subscribe(next1 => {
        this.employees = next1;
        this.setEmployeeCode();
      }, error => {
        console.log(error);
      }, () => {
        this.getFormCreate();
      });
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  setEmployeeCode(): string {
    const amount = this.employees.length + 1;
    this.employeeCode = 'NV-' + (amount < 10 ? '0' : '') + amount;
    return this.employeeCode;
  }

  private getFormCreate() {
    this.employeeCreateForm = new FormGroup({
      employeeCode: new FormControl(this.employeeCode),
      employeeName: new FormControl('', [Validators.required, Validators.minLength(5),
        Validators.maxLength(50), Validators.pattern('^\\s*(?:[A-Zà-ỹ][a-zà-ỹ]*(?: [A-Zà-ỹ][a-zà-ỹ]*)*)\\s*$')]),
      email: new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.maxLength(50), Validators.pattern('^\\s*[a-zA-Z0-9_.+-]+@gmail.com+\\s*$')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^\\s*(0)\\d{9}\\s*$')]),
      employeeAddress: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      gender: new FormControl('', [Validators.required]),
      idCard: new FormControl('', [Validators.required, Validators.pattern('^\\s*\\d{12}\\s*$')]),
      dateOfBirth: new FormControl('', [Validators.required, this.isOver18, this.isOver50]),
      employeeImg: new FormControl(''),
      position: new FormControl('', [Validators.required]),
    });
  }

  saveEmployee() {
    if (this.employeeCreateForm.valid) {
      if (this.inputImage !== null) {
        const nameImg = formatDate(new Date(), 'dd-MM-yyyy_hh:mm:ss:a_', 'en-US') + this.inputImage.name;
        const fileRef = this.storage.ref(nameImg);
        this.storage.upload(nameImg, this.inputImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.employeeCreateForm.patchValue({employeeImg: url});
              this.employeeService.saveEmployee(this.employeeCreateForm.value).subscribe(next => {
              });
            });
          })
        ).subscribe(next => {
          this.router.navigateByUrl('employees');
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });
          Toast.fire({
            icon: 'success',
            title: 'Thêm nhân viên thành công! Vui lòng kiểm tra trong danh sách'
          });
        });
      } else {
        this.inquiredImg = true;
      }
    }
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

  isOver50(control: AbstractControl): any {
    const dob = new Date(control.value);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dob.getDate())) {
      age--;
    }
    if (age > 50) {
      return {isOver50: true};
    }
  }

  isOver18(control: AbstractControl): any {
    const dob = new Date(control.value);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dob.getDate())) {
      age--;
    }
    if (age < 18) {
      return {isOver18: true};
    }
  }

  checkExistEmail(control: AbstractControl): any {
    const email = control.value;
    for (const employee of this.employees) {
      if (employee.email === email) {
        return {checkExistEmail: true};
      }
    }
  }

  checkExistPhone(control: AbstractControl): any {
    const phone = control.value;
    for (const employee of this.employees) {
      if (employee.phone === phone) {
        return {checkExistPhone: true};
      }
    }
  }

  checkExistIdCard(control: AbstractControl): any {
    const idCard = control.value;
    for (const employee of this.employees) {
      if (employee.idCard === idCard) {
        return {checkExistIdCard: true};
      }
    }
  }
}
