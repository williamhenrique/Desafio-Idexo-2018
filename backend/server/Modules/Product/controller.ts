import { Request, Response } from 'express';
import Product from './service';
import * as _ from 'lodash';
import {onError} from '../../api/responses/error';
import {onSuccess} from '../../api/responses/success';

class ProductController {

        private ProductService: Product;
   
        constructor() { 
            this.ProductService = Product;
        }
    
        getAll(req: Request, res: Response) {
          this.ProductService
          .getAll()
          .then(_.partial(onSuccess, res))
          .catch(_.partial(onError, res, 'Find all products failed'));
        }
    
        create(req: Request, res: Response) {
            this.ProductService
            .create(req.body)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Could not create product'));
        }
    
        finOnde(req: Request, res: Response) {
          this.ProductService
          .getById(parseInt(req.params.id))
          .then(_.partial(onSuccess, res))
          .catch(_.partial(onError, res, 'Find one product failed'));
        }
    
        update(req: Request, res: Response) {
          this.ProductService
          .update(parseInt(req.params.id), req.body)
          .then(_.partial(onSuccess, res))
          .catch(_.partial(onError, res, 'Update product failed'));
        }
    
        destroy(req: Request, res: Response) {
            this.ProductService
            .delete(parseInt(req.params.id))
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'An error ocurred to delete an product')); 
        }
    };
    
    export default ProductController;