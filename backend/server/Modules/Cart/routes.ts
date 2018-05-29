import {Request, Response} from 'express';
import CartController from './controller';
let CartCtrl: CartController;
class CartRoutes {

    constructor(){
        CartCtrl = new CartController();
    }

    add(req: Request, res:Response){
       return CartCtrl.addCart(req, res); 
    }
    findCart(req: Request, res:Response){
        return CartCtrl.getCart(req, res); 
     }
    destroy(req: Request, res:Response){
        return CartCtrl.clearCart(req, res);     
    }
}

export default CartRoutes;