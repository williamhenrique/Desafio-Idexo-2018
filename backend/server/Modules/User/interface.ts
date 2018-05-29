export interface IUser {
    id: number,
    name: string,
    email: string,
    cpf: number,
}

export interface IUserDetail extends IUser {
    id: number,
    name: string,
    email: string,
    cpf: number,
    birthday: string,
    telephone: string,
    password: string,
    Address: Object
}



export function createUser({id, name, email, cpf}: any): IUser {
    return {
        id, name, email, cpf
    }
}

export function createUsers(data: any[]): IUser[] {
    return data.map(createUser)
}

export function createUserById({id, name, email, cpf,  birthday, password, telephone, Address}: any) {
    return {
        id, name, email, cpf,  birthday, password, telephone, Address
    }
}

export function createUserByEmail({id, name, email, cpf,  birthday, password, telephone, Address}: any ) : IUserDetail {
    return {
        id, name, email, cpf,  birthday, password, telephone, Address
    }
}