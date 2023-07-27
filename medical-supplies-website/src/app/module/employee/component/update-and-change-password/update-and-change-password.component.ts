import {Component, OnInit} from '@angular/core';
import {Employee} from '../../model/Employee';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {EmployeeService} from '../../service/employee.service';
import {DatePipe, formatDate} from '@angular/common';
import Swal from 'sweetalert2';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize, tap} from 'rxjs/operators';
import {TokenStorageService} from '../../../security/service/token-storage.service';

@Component({
  selector: 'app-update-and-change-password',
  templateUrl: './update-and-change-password.component.html',
  styleUrls: ['./update-and-change-password.component.css']
})
export class UpdateAndChangePasswordComponent implements OnInit {
  /**
   * NhanTQ
   */
  inputImage: any = '';
  employee: Employee;
  username: string;
  employeeFormGroup: FormGroup;
  maxSize: boolean;
  imgSrc: string;
  nameImg: string;
  /**
   * NhanTQ
   */
  constructor(private employeeService: EmployeeService,
              private storage: AngularFireStorage,
              private tokenStorageService: TokenStorageService) {
  }
  /**
   * NhanTQ
   */
  ngOnInit(): void {
    this.employeeFormGroup = new FormGroup({
      employeeImg: new FormControl('', [Validators.required]),
      employeeName: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(5),
        // tslint:disable-next-line:max-line-length
        Validators.pattern('^[a-zA-ZÀ-Ỹà-ỹĂăÂâĐđÊêÔôƠơƯưá-ýÁ-Ý]*\\s?[a-zA-ZÀ-Ỹà-ỹĂăÂâĐđÊêÔôƠơƯưá-ýÁ-Ý]*\\s?[a-zA-ZÀ-Ỹà-ỹĂăÂâĐđÊêÔôƠơƯưá-ýÁ-Ý]*$')]),
      gender: new FormControl('', [Validators.required]),
      // tslint:disable-next-line:max-line-length
      dateOfBirth: new FormControl('', [Validators.required, this.checkDateOfBirth,
        Validators.pattern('^(0?[1-9]|[1-2][0-9]|3[0-1])/(0?[1-9]|1[0-2])/\\\\d{4}$')]),
      // tslint:disable-next-line:max-line-length
      employeeAddress: new FormControl('', [Validators.required, Validators.maxLength(255), Validators.minLength(20), Validators.pattern('^[^!@#$%^&*()_+<>?\'\"{}\\`~|/\\\\]+$')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      salary: new FormControl(''),
      positionName: new FormControl('')
    });
    this.employeeService.findByEmployeeEqualUsername().subscribe(data => {
      this.employee = data;
      this.imgSrc = this.employee.employeeImg;
      this.employeeFormGroup.controls.employeeImg.setValue(this.employee.employeeImg);
      this.employeeFormGroup.controls.employeeName.setValue(this.employee.employeeName);
      this.employeeFormGroup.controls.gender.setValue(this.employee.gender);
      this.employeeFormGroup.controls.employeeAddress.setValue(this.employee.employeeAddress);
      this.employeeFormGroup.controls.salary.setValue(this.employee.salary);
      this.employeeFormGroup.controls.email.setValue(this.employee.account.email);
      this.employeeFormGroup.controls.phone.setValue(this.employee.phone);
      this.employeeFormGroup.controls.positionName.setValue(this.employee.position.positionName);
      // tslint:disable-next-line:max-line-length
      this.employeeFormGroup.controls.dateOfBirth.setValue(new DatePipe('en-US').transform(new Date(this.employee.dateOfBirth), 'yyyy-MM-dd'));
    });
  }
  /**
   * NhanTQ
   */
  updateEmployee() {
    const employee = this.employeeFormGroup.value as Employee;
    console.log(employee);
    if (this.inputImage !== '') {
      const nameImg = formatDate(new Date(), 'dd-MM-yyyy_hh:mm:ss:a_', 'en-US') + this.inputImage.name;
      // bỏ vào thư mục riêng
      // const nameImg = 'path/' + this.inputImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.inputImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            console.log('url: ' + url);
            this.employeeFormGroup.patchValue({employeeImg: url});
            console.log(this.employeeFormGroup.value);
            this.employeeService.updateEmployeeDetail(this.employeeFormGroup.value).pipe(
              tap(response => {
                console.log(response.status + ' res');
                if (response.status === 406) {
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Bạn vui lòng nhập lại các trường báo lỗi!',
                    showConfirmButton: false,
                    timer: 3000
                  });
                }
              })
            )
              .subscribe(next => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Cập nhật thành công',
                  showConfirmButton: false,
                  timer: 1500
                });
              });
          });
        })
      ).subscribe(url => {
        console.log(url);
      });
    } else {
      this.employeeFormGroup.controls.employeeImg.setValue(this.imgSrc);
      this.employeeService.updateEmployeeDetail(this.employeeFormGroup.value).pipe(
        tap(response => {
          console.log(response.status + ' res');
          if (response.status === 406) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Bạn vui lòng nhập lại các trường báo lỗi!',
              showConfirmButton: false,
              timer: 3000
            });
          }
        })
      ).subscribe(next => {
        console.log(next + 'nhan');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cập nhật thành công',
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
  }
  /**
   * NhanTQ
   */
  checkDateOfBirth(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (value !== null && value !== undefined) {
      const currentDate = new Date();
      const birthDate = new Date(value);

      const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
      const monthsDiff = currentDate.getMonth() - birthDate.getMonth();
      const daysDiff = currentDate.getDate() - birthDate.getDate();

      if (yearsDiff > 18 || (yearsDiff === 18 && monthsDiff > 0) || (yearsDiff === 18 && monthsDiff === 0 && daysDiff >= 0)) {
        return null;
      }
    }
    return {checkAge: true}; // user trên 18 tuổi
  }

  // changePassword(presentPassword: string, confirmPassword: string) {
  //   // this.employeeService.findByEmployeeEqualUsername().subscribe(next => {
  //   //   const username = next.account.username;
  //   //   console.log(username);
  //   const username = this.tokenStorageService.getUser();
  //   this.employeeService.changePassword(new ChangePasswordDto(username, presentPassword, confirmPassword))
  //     .pipe(
  //       tap(response => {
  //         console.log(response.status);
  //         if (response.status === 202) {
  //           Swal.fire({
  //             position: 'center',
  //             icon: 'error',
  //             title: 'Mật khẩu hiện tại không trùng khớp!',
  //             showConfirmButton: false,
  //             timer: 1500
  //           });
  //         } else if (response.status === 200) {
  //           Swal.fire({
  //             position: 'center',
  //             icon: 'success',
  //             title: 'ok!',
  //             showConfirmButton: false,
  //             timer: 1500
  //           });
  //         }
  //       })
  //     ).subscribe(temp => {
  //   });
  //   // });
  // }
  /**
   * NhanTQ
   */
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
