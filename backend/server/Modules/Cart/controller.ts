import { Request, Response } from 'express';
import Cart from './service';
import * as _ from 'lodash';
import {onError} from '../../api/responses/error';
import {onSuccess} from '../../api/responses/success';

class CartController  {

        private CartService: Cart;   
        constructor() { 
            this.CartService = Cart;
        }
    
        addCart(req: Request, res: Response) {
            this.CartService
            .createCart(req.body)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Add cart failed'));
        }

        getCart(req: Request, res: Response) {
            this.CartService
            .getCart(req.params.session_id)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find cart failed'));
        }

        clearCart(req: Request, res: Response){
            this.CartService
            .destroyCart(req.params.session_id)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Clear cart failed'));
        }
    
   };
    
    export default CartController;