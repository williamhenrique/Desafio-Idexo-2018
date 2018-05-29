import { ComponentService } from './../../component.service';
import { Conta } from './../../_models/conta';
import { Component, OnInit, Input  } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { ContaService } from './../../_services/conta.service';
import { CheckoutService } from './../../_services/checkout.service';
import { AuthenticationService } from '../../_services/authentication.service';


@Component({
  selector: 'front-conta',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @Input() conta: Conta;

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

 contaForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private contaService: ContaService,
      private checkoutService: CheckoutService,
      private authenticationService: AuthenticationService,
      private bootstrapService: ComponentService
    ) {}

  ngOnInit() {
    if(this.conta){
      this.setDados(this.conta);
    }else{
      this.setDados({});
    }

  }


  setDados(dados) {
    let Addr = dados.Address;

    this.contaForm = this.formBuilder.group({
      name: this.formBuilder.control(dados.name, [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control(dados.email, [Validators.required, Validators.pattern(this.emailPattern)]),
      password: this.formBuilder.control('', [Validators.minLength(8)]),
      cpf: this.formBuilder.control(dados.cpf, [Validators.required]),
      telephone: this.formBuilder.control(dados.telephone, [Validators.required, Validators.pattern(this.numberPattern)]),
      birthday: this.formBuilder.control(dados.birthday, [Validators.required]),
       Address: this.formBuilder.group({
      zipcode:  this.formBuilder.control((Addr.hasOwnProperty('zipcode') ? Addr.zipcode : ''),
        [Validators.required, Validators.minLength(8), Validators.pattern(this.numberPattern)]),
      street: this.formBuilder.control((Addr.hasOwnProperty('street') ? Addr.street : ''), [Validators.required]),
      street_number: this.formBuilder.control((Addr.hasOwnProperty('street_number') ? Addr.street_number : ''), [Validators.required]),
      neighborhood: this.formBuilder.control((Addr.hasOwnProperty('neighborhood') ? Addr.neighborhood : ''), [Validators.required]),
      city: this.formBuilder.control((Addr.hasOwnProperty('city') ? Addr.city : ''), [Validators.required]),
       state: this.formBuilder.control((Addr.hasOwnProperty('state') ? Addr.state : ''), [Validators.required, Validators.minLength(2)])
      })
    });
  }

  continue(value){



   value.birthday = value.birthday.split('-').reverse().join('-');
   if(this.bootstrapService.validateSession()){
      this.checkoutService.setAccountValidate(true);
      return true;
   }
   this.contaService.register(value)
    .then( conta => {
             this.authenticationService.login(value.email, value.password).subscribe(result => {
               if (result === true) {
                 this.checkoutService.setAccountValidate(true);
               }
             }, (err) => {
                 console.log('Erro');
             });
      },
      error =>  <any>error
    );
  }

}

