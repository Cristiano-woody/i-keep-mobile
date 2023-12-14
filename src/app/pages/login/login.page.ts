import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin = {
    email: '',
    password: ''
  }

  requiredInput = false

  invalidCredentials = false

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.invalidCredentials = false;
    this.requiredInput = false;
    if (
      this.formLogin.email === '' ||
      this.formLogin.password === ''
    ) {
      this.requiredInput = true;
      return;
    }
    this.userService.login(this.formLogin).subscribe(
      (result: { authToken: string; userId: string }) => {
        window.localStorage.setItem('authToken', `Bearer ${result.authToken}`);
        window.localStorage.setItem('userId', result.userId);
        this.formLogin = {
          email: '',
          password: ''
        }
        this.router.navigate(['']);
      },
      (error: any) => {
        this.invalidCredentials = true;
        this.formLogin = {
          email: '',
          password: ''
        }
      }
    );
  }
}