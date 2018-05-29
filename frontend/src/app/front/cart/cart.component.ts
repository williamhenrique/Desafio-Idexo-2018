import { Component, OnInit, Input, ViewContainerRef  } from '@angular/core';
import {Router} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CartService } from './../../_services/cart.service';
import { CheckoutService } from '../../_services/checkout.service';


@Component({
  selector: 'front-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private cart: {};
  private product_list: {};
  private subtotal_cart: number;
  public total_cart: number;
  public qtd_items: number = 0;

  @Input() resume: boolean = true;

  constructor(private cartService : CartService,
              private checkoutService: CheckoutService,
              private router: Router,
              public toastr: ToastsManager,
              vcr: ViewContainerRef
            ) {
             this.toastr.setRootViewContainerRef(vcr);
            }

  ngOnInit() {
    this. getCart();
  }

  getCart(){
    this.cartService.getCart()
    .subscribe(
      cart => {

      this.subtotal_cart = cart.subtotal_cart;
      this.total_cart = cart.total_cart;
      this.qtd_items = cart.product_list
      .reduce((prev, value)=>{
        return prev+1
      }, 0)
      return  this.product_list = cart.product_list;
      },
      error => console.log(error)
    );
  }

  addItem(produto_id, quantidade){
   this.cartService.addItemCart(produto_id, quantidade)
   .then( cart => {
    this.getCart();
       this.toastr.success('Produto alterado com sucesso!', 'Sucesso!');
    },
    error =>  this.toastr.error('Ocorreu um erro.', 'Oops!')
  );
 }

  checkout(resume){
    //se não for resumo da compra manda pro checkout
    if(!resume){
      this.router.navigate(['checkout']);
    }

    alert('Processando integracao...');

  }






}
