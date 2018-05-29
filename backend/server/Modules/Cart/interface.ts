export interface ICart {
    readonly id: number,
    user_id: number,
    product_id: number,
    quantity: number
}

export interface ICartDetail extends ICart {
    id: number,
    user_id: number,
    product_id: number,
    quantity: number,
    Product: string,
    product_total: string
}

export function createCart({id, user_id, product_id, quantity}: any): ICart {
    return {
        id, user_id, product_id, quantity
    }
}

export function createCarts(data: any[]): ICart[] {
    return data.map(createCart)
}

export function listCartWithProducts(data: any[]): ICartDetail[] {
    return data.map(cartWithProducts);
}

export function cartWithProducts({id, user_id, product_id, quantity, Product, product_total}: any): ICartDetail {
    return {
        id, user_id, product_id, quantity, Product, product_total
    }
}