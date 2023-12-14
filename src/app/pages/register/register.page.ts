import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formRegister = {
    name: '',
    email: '',
    password: ''
  }

  InvalidEmailSpanError = false;
  requiredInputsError = false;
  InvalidPasswordSpanError = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.InvalidEmailSpanError = false;
    this.requiredInputsError = false;
    this.InvalidPasswordSpanError = false;
    if (
      this.formRegister.name === '' ||
      this.formRegister.email === '' ||
      this.formRegister.password === ''
    ) {
      this.requiredInputsError = true;
      return;
    }
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const result: boolean = expression.test(this.formRegister.email);
    if(!result) {
      this.InvalidEmailSpanError = true;
      return
    }
    if(this.formRegister.password.length < 6) {
      this.InvalidPasswordSpanError = true
      return
    }
    
    this.userService.register(this.formRegister).subscribe(
      () => {
        this.router.navigate(['/login']);
        this.formRegister = {
          name: '',
          email: '',
          password: ''
        }
      },
      (error: any) => {
        this.formRegister = {
          name: '',
          email: '',
          password: ''
        }
      }
    );
  }

}
