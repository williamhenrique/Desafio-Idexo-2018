import { Component, OnInit, Input    } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { Produto } from './../../../_models/produto';
import { ProdutoService } from './../../../_services/produto.service';
import { CartService } from './../../../_services/cart.service';


@Component({
  selector: 'front-produto',
  templateUrl: './product_single.component.html',
  styleUrls: ['./product_single.component.css']
})
export class ProductSingleComponent implements OnInit {
  private produto: any;
  productForm: FormGroup;
  private numberPattern = /^[0-9]*$/

  constructor(
      private formBuilder: FormBuilder,
      private url: ActivatedRoute,
      private router: Router,
      private produtoService: ProdutoService,
      private cartService: CartService
  ) { }

  ngOnInit() {
        this.produtoService.produtoID(this.url.snapshot.params['id'])
          .subscribe(
            produto => {
              produto['rating'] = Array(produto['rating']).fill(1).map((x,i)=>i);
              return  this.produto = produto;
            },
            error => console.log(error)

          );

          this.productForm = this.formBuilder.group({
            quantity: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
          });
   }

   addItem(produto_id, quantidade): void {
    this.cartService.addItemCart(produto_id, quantidade)
    .then( cart => {
        this.router.navigate(['./cart']);
     },
     error =>  alert(error));
  }
   valite() {

   }


  navigate(){
   //return
    this.router.navigateByUrl('./');
  }

}
