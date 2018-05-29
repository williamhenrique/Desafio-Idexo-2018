import {Request, Response} from 'express';
import ProductController from './controller';
let ProductCtrl: ProductController;
class ProductRoutes {

    constructor(){
        ProductCtrl = new ProductController();
    }

    index(req: Request, res:Response){
        return ProductCtrl.getAll(req, res); 
    }
    create(req: Request, res:Response){
        return ProductCtrl.create(req, res); 
    }
    finOnde(req: Request, res:Response){
        return ProductCtrl.finOnde(req, res);
    }
    update(req: Request, res:Response){
        return ProductCtrl.update(req, res); 
    }
    destroy(req: Request, res:Response){
        return ProductCtrl.destroy(req, res);
    }
}

export default ProductRoutes;