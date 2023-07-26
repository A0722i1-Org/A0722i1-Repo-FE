import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../../model/LoginRequest';
import {JwtResponse} from '../../model/JwtResponse';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {
  mainForm: FormGroup;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    this.mainForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  submit() {
    const loginRequest: LoginRequest = this.mainForm.value;
    this.http.post('http://localhost:8080/api/v1/public/login', loginRequest).subscribe(data => {
      const jwtResponse: JwtResponse = data;
      alert('Login success.');
      localStorage.setItem('token', jwtResponse.token);
      this.router.navigateByUrl('/employees/detail');
    }, error => {
      alert('Login Failed.');
    });
  }
}
