import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {TokenStorageService} from '../../service/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareService} from '../../service/share.service';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  username: string;
  roles: string[];
  returnUrl: string;

  constructor(
              private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
        username: new FormControl('', []),
        password: new FormControl('', []),
        remember_me: new FormControl('', [])
      }
    );

    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  onSubmit() {
    debugger
    this.authService.login(this.formLogin.value).subscribe(data => {
        if (this.formLogin.value.remember_me) {
          this.tokenStorageService.saveTokenLocal(data.token);
          this.tokenStorageService.saveUserLocal(data.username);
        } else {
          this.tokenStorageService.saveTokenSession(data.accessToken);
          this.tokenStorageService.saveUserLocal(data.username);
        }
        this.authService.isLoggedIn = true;
        alert('OK');
        this.username = this.tokenStorageService.getUser().username;
        this.roles = this.tokenStorageService.getUser().roles;
        this.formLogin.reset();
        this.router.navigateByUrl(this.returnUrl);
        // this.shareService.sendClickEvent();
      },
      err => {
        this.authService.isLoggedIn = false;
      });
  }
}
