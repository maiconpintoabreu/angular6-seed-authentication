import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login : Login;
  constructor(private loginService : LoginService) {
    this.login = new Login();
  }

  ngOnInit() {

  }
  loginSubmit() {
    //create login method
    console.log(this.login);
    this.loginService.loginSubmit(this.login).subscribe();
  }
}
