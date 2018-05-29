import { IProduct, IProductDetail, createProduct, createProducts, createProductById } from './interface';
import * as Bluebird from 'bluebird';

const model = require('../../models');

class Product implements IProduct {
    public id: number;
    public name: string;
    public description: string;
    public image: string;
    public value: number;
    public factor: string;
    public rating: string;

    constructor() {}

    create(Product: any) {
        return model.Product.create(Product);
    }

    getAll(): Bluebird<IProduct[]> { 
        return model.Product.findAll({
            order: ['name']
        }).then(data => {
            if(data)
                return createProducts(data)

            return data;
        }).catch(err => err);
    }

    getById(id: number): Bluebird<IProductDetail> { 
        return model.Product.findOne({
            where: {id}
        }).then(data => {
              if(data)
                return createProductById(data)

              return data;
        }).catch(err => err);
    }

    update(id: number, Product: any){
        return model.Product.update(Product,{
            where: { id }            
        })
    }

    delete(id: number) {
        return model.Product.destroy({
            where: {id}
        })
    }
}

export default new Product();