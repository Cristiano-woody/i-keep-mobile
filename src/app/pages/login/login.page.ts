import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log(this.formLogin)
  }
}
