import { SocialUser } from 'angular5-social-login';
import { Injectable, EventEmitter} from '@angular/core';
import { ComponentService } from './../component.service';

@Injectable()
export class CheckoutService {
  eventTabsVisiveis = new EventEmitter<any>();
  public eventUserdata = new EventEmitter<any>();
  public statusAccountValidate = new EventEmitter<any>();
  public statusPaymentValidate = new EventEmitter<any>();
  public cardId = new EventEmitter<any>();
  private tabsVisiveis: string = 'false';

  constructor(private bootstrapService: ComponentService) {}

  getTabsVisiveis() {
    return this.tabsVisiveis;
  }

  setTabsVisiveis(val: any) {
    this.eventTabsVisiveis.emit(val);
  }

  setUserData(userdata) {
    this.eventUserdata.emit(userdata);
  }

  setAccountValidate(validate: boolean = false) {
    this.statusAccountValidate.emit(validate);
  }

  setPaymentValidate(validate: boolean = false) {
    this.statusPaymentValidate.emit(validate);
  }
  setCardId(cardId: string) {
    this.cardId.emit(cardId);
  }


  checkout() {
      if (!this.validateCheckout()) {
        return false;
      }

  }

  validateCheckout() {

    return true;
  }


}
