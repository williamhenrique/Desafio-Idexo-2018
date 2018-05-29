import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { HttpModule } from '@angular/http';
import ptBr from '@angular/common/locales/pt';
import { AppRoutingModule } from './app-routing.module';
import { ComponentService } from './component.service';
import { AppComponent } from './app.component';
import {NgxMaskModule} from 'ngx-mask'
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import { HeaderComponent } from './front/header/header.component';
import { FooterComponent } from './front/footer/footer.component';
import { ProductGridComponent } from './front/product/product_grid/product_grid.component';
import { ProductSingleComponent } from './front/product/product_single/product_single.component';
import { BannerComponent } from './front/banner/banner.component';
import { HomeComponent } from './front/home/home.component';
import { CartComponent } from './front/cart/cart.component';
import { CheckoutComponent } from './front/checkout/checkout.component';
import { LoginComponent } from './front/login/login.component';
import { AccountComponent } from './front/account/account.component';
import { PaymentComponent } from './front/checkout/payment/payment.component';
import { ResumoComponent } from './front/checkout/resumo/resumo.component';

import { HomeComponent as HomeAdminComponent } from './admin/home/home.component';
import { LoginComponent as LoginAdminComponent} from './admin/login/login.component';


import {SharedModule} from './_shared/shared.module';
import { FACEBOOK_API_TOKEN } from './app.api';

registerLocaleData(ptBr);
import {
  SocialLoginModule,
  AuthServiceConfig,
  FacebookLoginProvider,
} from "angular5-social-login";
import { ProductListComponent } from './admin/product-list/product-list.component';
import { ProductComponent } from './admin/product/product.component';
import { OrderComponent } from './admin/order/order.component';
//Configuração do social login
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [{
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(FACEBOOK_API_TOKEN)
      }]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductGridComponent,
    ProductSingleComponent,
    BannerComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    AccountComponent,
    PaymentComponent,
    ResumoComponent,
    ProductListComponent,
    ProductComponent,
    OrderComponent,
    HomeAdminComponent,
    LoginAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule, // (Required) for share counts
    BrowserAnimationsModule,
    ShareButtonsModule.forRoot(),
    SharedModule.forRoot(),
    NgbModule.forRoot(),
    NgxMaskModule.forRoot(),
    ToastModule.forRoot(),
    SocialLoginModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: AuthServiceConfig, useFactory: getAuthServiceConfigs},
    ComponentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
