import {Component, OnInit} from '@angular/core';
import {ChangePasswordDto} from '../../model/ChangePasswordDto';
import {tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {TokenStorageService} from '../../../security/service/token-storage.service';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {EmployeeService} from '../../service/employee.service';

@Component({
  selector: 'app-modal-change-password',
  templateUrl: './modal-change-password.component.html',
  styleUrls: ['./modal-change-password.component.css']
})
export class ModalChangePasswordComponent implements OnInit {
  /**
   * NhanTQ
   */
  changePasswordFormGroup: FormGroup;

  /**
   * NhanTQ
   */
  constructor(private tokenStorageService: TokenStorageService,
              private employeeService: EmployeeService) {
  }
  /**
   * NhanTQ
   */
  ngOnInit(): void {
    this.changePasswordFormGroup = new FormGroup({
      presentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });
  }
  /**
   * NhanTQ
   */
  changePassword() {
    const username = this.tokenStorageService.getUser();
    this.employeeService.changePassword(new ChangePasswordDto(username,
      this.changePasswordFormGroup.value.presentPassword,
      this.changePasswordFormGroup.value.confirmPassword))
      .pipe(
        tap(response => {
          console.log(response.status + ' res');
          if (response.status === 202) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Bạn vui lòng nhập đúng mật khẩu hiện tại hoặc xác nhận mật khẩu mới chính xác !',
              showConfirmButton: false,
              timer: 3000
            });
          }
        })
      ).subscribe(temp => {
      console.log(temp.status + ' temp');
      this.changePasswordFormGroup.reset();
      if (temp.username === username) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cập nhật mật khẩu thành công!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }


}
