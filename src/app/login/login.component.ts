import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private invalidLogin = false;
  form = new FormGroup({
    username  : new FormControl(
      '',
      [ Validators.email, Validators.required ]
    ),  
    password  : new FormControl(
      '',
      [ Validators.required, Validators.minLength(6) ]
    )  
  });

  constructor( private authService:AuthService, private router:Router )  { }

  ngOnInit() {
  }

  get username()
  {
    return this.form.get( 'username' );
  }

  get password()
  {
    return this.form.get( 'password' );
  }

  login()
  {
    this.authService.login( this.form.value ).subscribe( result => {
    }, error => {
      this.invalidLogin = true;
    }); 
  }

}
