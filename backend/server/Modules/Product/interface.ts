export interface IProduct {
    readonly id: number,
    name: string,
    description: string,
    image: string,
    value: number,
    factor: string,
    rating: string;
}

export interface IProductDetail extends IProduct {
    id: number,
    name: string,
    description: string,
    image: string,
    value: number,
    factor: string,
    rating: string;
    
}

export function createProduct({id, name, description, image, value, factor, rating}: any): IProduct {
    return {
        id, name, description, image, value, factor, rating
    }
}

export function createProducts(data: any[]): IProduct[] {
    return data.map(createProduct)
}

export function createProductById({id, name, description, image, value, factor, rating}: any): IProductDetail {
    return {
        id, name, description, image, value, factor, rating
    }
}