import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.login('wil-hc@hotmail.com', '12345678');
  }


  login(email, password){
    //   this.loginService.login(email, password, '/admin')
    // .then( login => {
    //   //  this.setDados(conta.payload);
    //   //  this.checkoutService.setAccountValidate(true);
    // })
  }

}
