import {Component, ElementRef, OnInit} from '@angular/core';
import {EmployeeService} from "../service/employee.service";
import {Employee} from "../model/Employee";
import {Position} from "../model/Position";
import Swal from 'sweetalert2';
import {query} from "@angular/animations";


@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employees : Employee[] = []
  employeeNameSearch :string = '';
  dateOfBirth : string = '';
  posName : string = '';
  positions :Position[] = []
  employeeNameDelete : string = '';
  employee : Employee;
  modal : any;
  constructor(private employeeService : EmployeeService) { }

  openEmployeeModal() {
    this.modal.style.display  = "block";
  }
  closeEmployeeModal() {
    this.modal.style.display = 'none';
  }
  getAllWithSearch(){
    this.employeeService.getEmployeeWithNameAndDobAndPos(this.employeeNameSearch,this.dateOfBirth,this.posName).subscribe(next =>{
      this.employees = next;
    })
  }
  getAllPosition(){
    this.employeeService.getAllPos().subscribe(next=>{
      this.positions = next;
    })
  }
  ngOnInit(): void {
    this.getAllPosition();
    this.getAllWithSearch();
    this.modal = document.querySelector('modal') as unknown as ElementRef;
  }
  getEmployee(id_employee : Number){
    this.employeeService.getEmployeeById(id_employee).subscribe(next=>{
      this.employee = next;
      this.openEmployeeModal()
    })

  }
  search(nameEmployee: string, dateofbirth: string, position: string) {
    const specialCharPattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    this.employeeNameSearch = nameEmployee;
    this.dateOfBirth = dateofbirth;
    this.posName = position;
    console.log(this.dateOfBirth)
    if(specialCharPattern.test(this.employeeNameSearch)||this.employeeNameSearch.length>36){
      Swal.fire({
        icon: 'error',
        text: 'Chuổi không được chứa kí tự đặc biệt và lớn hơn 36 kí tự',
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 3000  // Adjust the duration of the alert (in milliseconds) as needed
      });
    }
    this.employeeService.getEmployeeWithNameAndDobAndPos(this.employeeNameSearch,this.dateOfBirth,this.posName).subscribe(next =>{
      this.employees = next;
    })
  }

  delete(employeeId: number,employeName:string) {
    this.employeeNameDelete = employeName;
    Swal.fire({
      title: 'Bạn có chắc không ?',
      text: "Xóa "+this.employeeNameDelete+ " này khỏi danh sách ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00b894',
      cancelButtonColor: 'red',
      confirmButtonText: 'Xóa nhân viên',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteByID(employeeId).subscribe()
        Swal.fire({
            title: 'Xóa thành công',
            text: this.employeeNameDelete + ' đã bị xóa khỏi danh sách',
            icon: 'success',
            confirmButtonColor: '#00b894',
            confirmButtonText: 'Đóng',
          }
        )
      }
    })
  }
}
