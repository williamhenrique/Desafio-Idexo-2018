import { environment } from './../../../../environments/environment';
import { CheckoutService } from './../../../_services/checkout.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import * as pagarme from 'pagarme';

@Component({
  selector: 'front-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  private pagar_me;
  paymentForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private checkoutService: CheckoutService) {
    this.pagar_me = pagarme;
   }

  numberPattern = /^[0-9]*$/;

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      card_holder_name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      card_number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern), Validators.minLength(16)]),
      card_cvv: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern), Validators.minLength(3)]),
      card_expiration_date: this.formBuilder.control('', [Validators.required, Validators.minLength(4)])
    });
  }

  payment(dados) {

    this.pagar_me.client.connect({ api_key: environment.pagar_me_api_token })
    .then(client => client.cards.create({
      card_number: this.paymentForm.value.card_number,
      card_holder_name: this.paymentForm.value.card_holder_name,
      card_expiration_date: this.paymentForm.value.card_expiration_date,
      card_cvv: this.paymentForm.value.card_cvv
    }))
    .then(card => {
        this.checkoutService.setPaymentValidate(true);
        this.checkoutService.setCardId(card.id);
        return card;
      }
    )

  }

}
