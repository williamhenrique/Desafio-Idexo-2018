import { Conta } from '../../_models/conta';
import { ContaService } from './../../_services/conta.service';
import { CheckoutService } from './../../_services/checkout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'front-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  public cadastroOpen: any = true;
  public pagamentoOpen: any = true;
  public checkoutOpen: any = true;
  public active: string = 'toggle-1';
  public conta: Conta;

  constructor(
    private checkoutService: CheckoutService,
    private contaService: ContaService
  ) {}

  ngOnInit() {
      this.checkoutService.eventTabsVisiveis.subscribe(
        (a) => {
        this.cadastroOpen = !a;
        this.active = "toggle-2";
        }
      );

     //observa os dados da conta definido pelo login
     this.checkoutService.eventUserdata.subscribe(
        dadosConta => {
          this.conta = dadosConta;
        }
      );

     //observa os dados da validação
     this.checkoutService.statusAccountValidate.subscribe(
        validateAccount => {
          this.pagamentoOpen = !validateAccount;
          this.active = 'toggle-3';
        }
     );

     this.checkoutService.statusPaymentValidate.subscribe(
      validatePayment => {
        this.checkoutOpen = !validatePayment;
        this.active = 'toggle-4';
      }
   );


  }




}
