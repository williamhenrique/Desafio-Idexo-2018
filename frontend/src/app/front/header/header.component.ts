import { CartService } from './../../_services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'front-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public total_cart: number = 0.0;
  public qtd_items: number = 0;
  constructor(private cartService : CartService) { }


  ngOnInit() {
    this.getCartTotal();
  }

  getCartTotal(){
    this.cartService.getCart()
    .subscribe(
      cart => {
      this.total_cart = cart.total_cart;
      this.qtd_items = cart.product_list
          .reduce((prev, value)=>{
            return prev+1
          }, 0)
      return cart;
      },
      error => console.log(error)
    );
  }

}
