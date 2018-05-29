import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { AuthenticationService } from './../../_services/authentication.service';
import { CheckoutService } from './../../_services/checkout.service';
import { AuthService, SocialUser, FacebookLoginProvider } from "angular5-social-login";
import { ContaService } from './../../_services/conta.service';

@Component({
  selector: 'front-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private dados: any;
  constructor(
    private socialAuthService: AuthService,
    private authenticationService: AuthenticationService,
    private contaService: ContaService,
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder
  ) {}

  public socialSignIn() {
    return this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.authenticationService.loginWithFacebook(userData).subscribe(result => {
                if (result === true) {
                  this.contaService.accounts(userData.email).subscribe(
                    dados => {
                      this.checkoutService.setUserData(this.contaService.accountsMap(dados));
                      this.checkoutService.setTabsVisiveis(true);
                      return dados;
                    },
                    error => {console.log(error)}
                  );
                }
        }, (err) => {
           this.checkoutService.setUserData(this.contaService.accountsMap({id: userData.id, name: userData.name, email: userData.email}));
           this.checkoutService.setTabsVisiveis(true);
        });

      }
    );
  }

  public login(email: string, password: string) {

  }

  ngOnInit() {}
}

