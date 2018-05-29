import {NgModule, ModuleWithProviders} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CartService } from './../_services/cart.service';
import { CheckoutService } from './../_services/checkout.service';
import { ContaService } from './../_services/conta.service';
import { ProdutoService } from './../_services/produto.service';
import { AuthenticationService } from './../_services/authentication.service';
import { InputComponent } from './input/input.component';
import { InterceptorService } from './../_services/interceptor.service';


@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, CommonModule, FormsModule, ReactiveFormsModule ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers:[
        CartService,
        CheckoutService,
        ContaService,
        ProdutoService,
        AuthenticationService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: InterceptorService,
          multi: true
        }
      ]
    };
  }
}
