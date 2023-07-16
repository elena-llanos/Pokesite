import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  admin: any;


  constructor(private _router: Router) {
    this.admin = {};
  }

  login(): void {
    console.log(this.admin.usuario);
    console.log(this.admin.password);
    localStorage.setItem("usuario" , this.admin.usuario);
    localStorage.setItem("password" , this.admin.password);
    this._router.navigate(['home'])
   
    
  }



}
