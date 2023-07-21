import {Component, ElementRef, OnInit} from '@angular/core';
import {EmployeeService} from "../service/employee.service";
import {Employee} from "../model/Employee";
import {Position} from "../model/Position";
import Swal from 'sweetalert2';



@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employeeNameSearch :string ='';
  dateOfBirth : string ='';
  posName : string ='';
  positions :Position [] = []
  employeeNameDelete : string ='';
  employee : Employee ;
  isModalOpen = false;

  employees : Employee [] = []
  constructor(private employeeService : EmployeeService) {
    this.getAllWithSearch();
    this.getAllPosition();
    console.log(this.employees)
  }

  openEmployeeModal() {
    this.isModalOpen = true;
  }

  closeEmployeeModal() {
    this.isModalOpen = false;
  }
  getAllWithSearch(){
    this.employeeService.getEmployeeWithNameAndDobAndPos(this.employeeNameSearch,this.dateOfBirth,this.posName)
      .subscribe(next =>{
      this.employees = next;
    })
  }
  getAllPosition(){
    this.employeeService.getAllPos().subscribe(next => {
      this.positions = next;


    })
  }
  ngOnInit(): void {
  }
  getEmployee(id_employee : Number){
    this.employeeService.getEmployeeById(id_employee).subscribe(next=>{
      this.employee = next;
      console.log(next);
      this.openEmployeeModal()
    })

  }
  search(nameEmployee: string, dateofbirth: string, position: string) {
    const specialCharPattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    this.employeeNameSearch = nameEmployee
    console.log(nameEmployee)
    this.dateOfBirth = dateofbirth;
    console.log(dateofbirth)
    this.posName = position;
    console.log(position)

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
    else {
      this.employeeService.getEmployeeWithNameAndDobAndPos(this.employeeNameSearch, this.dateOfBirth, this.posName).subscribe(next => {
        if(next.length==0){
          this.employees = [];
          console.log(this.employees)
          console.log("goodbye")
        }
        console.log(next);
        this.employees = next;
        console.log(next);
        console.log('hello')
      })
    }
  }

  delete(employeeId: number,employeeName:string) {
    this.employeeNameDelete = employeeName;
    console.log(this.employeeNameDelete)
    console.log(employeeId)
    Swal.fire({
      title: 'Bạn có chắc không ?',
      text: "Xóa "+this.employeeNameDelete+ " khỏi danh sách ",
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
        this.getAllWithSearch()
      }
    })
  }
}
