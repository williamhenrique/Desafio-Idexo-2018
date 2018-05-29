import { ICart, ICartDetail, createCart, createCarts, listCartWithProducts, cartWithProducts } from './interface';
import { IProduct, IProductDetail, createProduct, createProducts, createProductById } from './../Product/interface';
import {DISCOUNT} from '../../config/tax_discount';

import * as Bluebird from 'bluebird';
import Product from '../Product/service';

const model = require('../../models');

class Cart implements ICart{
    public id: number;
    public user_id: number;
    public product_id: number;
    public quantity: number;
    private serviceProduto: Product;
    
    
    constructor() {
        this.serviceProduto = Product; 
    }

    createCart(Cart: any) : Bluebird<ICartDetail>{

        return model.Cart
        .findOne({
             where: {
                session_id: Cart.session_id,
                product_id: Cart.product_id
            } 
        })
        .then(function(obj) {

            if(Cart.quantity == 0){
                return model.Cart.destroy({
                    where: {
                        session_id: Cart.session_id,
                        product_id: Cart.product_id
                      }
                })
            }
            else if(obj) { 
                return model.Cart.update(Cart,{
                    where: {
                        session_id: Cart.session_id,
                        product_id: Cart.product_id
                      }
                 }).then(createCarts);    
            }
            else { 
                return model.Cart.create(Cart);
                
            }
        })
    }


    destroyCart(Cart: any){
        return model.Cart.destroy({
            where: {
                session_id: Cart.session_id,
              }
        })
    }
    
    getCart(session_id: string): Bluebird<ICartDetail> { 
       model.Cart.belongsTo(model.Product, { foreignKey: 'product_id' }); 
       return model.Cart.findAll({where:{session_id:session_id}, include:[{model:model.Product, required:false}]})
       .then(listCartWithProducts)
       .then(this.calculaPriceTotal)
   
    }

    calculaPriceTotal(products){
    let acumuladorProduto = new Array();
    
    let product_list = products.map(a => {
            //definindo preco total do item
            a.product_total = a.quantity * a.Product.value;
          
            if(typeof acumuladorProduto[a.Product.factor] === 'undefined')
                acumuladorProduto[a.Product.factor] = 0;
            
            //acumulando quantos produtos tenho em cada fator
            acumuladorProduto[a.Product.factor] += a.quantity;
            
            return a;
    });

    let subtotal_cart = product_list.reduce(function(prevVal, elem) {
        return prevVal + elem.product_total;
    }, 0)

    //calculando desconto por range
    let discount_percent = Object.keys(acumuladorProduto).map(function(key, index) {
        //calculando o limite de produtos por fator
        let maxQtdProduct = Math.round((DISCOUNT[key].max / DISCOUNT[key].min));
        
        if(acumuladorProduto[key] >= maxQtdProduct)
            return DISCOUNT[key].max
       
        //retorna o produto abaixo do limite vezes o minimo do desconto
        return acumuladorProduto[key] * DISCOUNT[key].min;  

     }).reduce(function(prevVal, elem) {
        return prevVal + elem;
    }, 0)
    
    if(discount_percent > DISCOUNT.max_discount)
        discount_percent = DISCOUNT.max_discount

    let total_cart = subtotal_cart * (100 - discount_percent) / 100
  
    return {
        product_list, 
        discount_percent,
        subtotal_cart,
        total_cart
     };
       
    }
}

export default new Cart();