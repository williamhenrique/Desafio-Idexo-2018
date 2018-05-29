import { Component, OnInit } from '@angular/core';
import { ProdutoService } from './../../../_services/produto.service';
import { Produto } from './../../../_models/produto';


@Component({
  selector: 'front-produtos',
  templateUrl: './product_grid.component.html',
  styleUrls: ['./product_grid.component.css']
})
export class ProductGridComponent implements OnInit {

  produtos: Produto[]

  constructor(private produtosService: ProdutoService) { }

  ngOnInit() {
    this.produtosService.produtos()
    .subscribe(
      produtos => {
        this.produtos = produtos.map(a => {
           a['rating'] = Array(a['rating']).fill(1); //transforma numero em array para o foreach do template
            return a;
          });
         return this.produtos ;
      },
      error => console.log(error)
    );
  }

}
