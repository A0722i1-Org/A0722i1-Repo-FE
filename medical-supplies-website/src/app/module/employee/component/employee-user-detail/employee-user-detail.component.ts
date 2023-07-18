import {Component, OnInit} from '@angular/core';
import {Employee} from '../../model/Employee';
import {FormControl, FormGroup} from '@angular/forms';
import {EmployeeService} from '../../service/employee.service';
import {Router} from '@angular/router';
import {EmployeeUserDetail} from '../../model/EmployeeUserDetail';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-employee-user-detail',
  templateUrl: './employee-user-detail.component.html',
  styleUrls: ['./employee-user-detail.component.css']
})
export class EmployeeUserDetailComponent implements OnInit {
  private _employeeUserDetail: EmployeeUserDetail;
  private _mainForm: FormGroup;

  constructor(private _employeeService: EmployeeService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.mainForm = new FormGroup({
      employeeName: new FormControl(''),
      phone: new FormControl(''),
      idCard: new FormControl(''),
      dateOfBirth: new FormControl(''),
      employeeAddress: new FormControl(''),
      accountEmail: new FormControl('')
    });

    this._employeeService.getUserDetail().subscribe(data => {
      this.employeeUserDetail = data;
      this.employeeUserDetail.dateOfBirth = new DatePipe('en-US').transform(new Date(this.employeeUserDetail.dateOfBirth), 'yyyy-MM-dd');
      this.mainForm.patchValue(this.employeeUserDetail);
    });
  }

  public showUpdateComponent(): void {
    this._router.navigateByUrl('/employees/user-detail-update');
  }

  // Getters/Setters Begin.
  get employeeUserDetail(): EmployeeUserDetail {
    return this._employeeUserDetail;
  }

  set employeeUserDetail(value: EmployeeUserDetail) {
    this._employeeUserDetail = value;
  }

  get mainForm(): FormGroup {
    return this._mainForm;
  }

  set mainForm(value: FormGroup) {
    this._mainForm = value;
  }

  // Getters/Setters End.
}
