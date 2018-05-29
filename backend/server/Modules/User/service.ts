import { IUser, IUserDetail, createUser, createUsers, createUserById, createUserByEmail } from './interface';
import * as Bluebird from 'bluebird';

const model = require('../../models');

class User implements IUser {
    public id: number;
    public name: string;
    public email: string;
    public cpf: number;
    public password: string;
    public birthday: string;

    
    constructor() {}

    create(user: any) {
       
        const CreateAssociation = model.User.hasOne(model.Address, {foreignKey: { name: 'user_id', allowNull: false }});
        return model.User.create(user, {
          include: [ CreateAssociation ]
        });

    }

    getAll(): Bluebird<IUser[]> { 
        const Creator = model.User.hasOne(model.Address, {foreignKey: { name: 'user_id', allowNull: false }});
        return model.User.findAll({
            order: ['name'],
            include: [ Creator ]
          
        })
        .then(createUsers)
        .catch(err => err);
    }

    getById(id: number): Bluebird<IUserDetail> { 
        const Creator = model.User.hasOne(model.Address, {foreignKey: { name: 'user_id', allowNull: false }});
        return model.User.findOne({
            where: {id},
            include: [ Creator ]
        })
        .then(createUserById)
        .catch(err => err);

    }

    getByEmail(email:string, rule = 'user'): Bluebird<IUserDetail> {
        const Creator = model.User.hasOne(model.Address, { foreignKey: { name: 'user_id', allowNull: true }});
        return model.User.findOne({
          where: {email, rule},
          include: [ Creator ]
        })
        .then(createUserByEmail)
        .catch(err => err);
    }
    
    update(id: number, user: any): Bluebird<IUserDetail> {
        // const Creator = model.User.hasOne(model.Address, {foreignKey: { name: 'user_id', allowNull: false }});
        // return model.User.findOne({
        //     where: {id},
        //     include: [ Creator ]
        // })
        // .then(
        //     function (user) {
        //     }
        //     createUserById
        
        
        // );

        const Creator = model.User.hasOne(model.Address, {foreignKey: { name: 'user_id', allowNull: false }});
        // return model.User.findOne({
        //   where: {id : id},
        //   include: [ Creator ]
        // })
       return model.User.findOne({
            where: {id : id},
            include: [ Creator ]
          }).then(function (product) {
            
          if (product) {
            return product.updateAttributes(user, {validate: false}).then(function (result) {
                return result;
            });
          }
          
        //   else {
        //     throw new Error("no such product type id exist to update");
        //   }
        });


    //    const Creator = model.User.hasOne(model.Address, {foreignKey: { name: 'user_id', allowNull: false }});
    //     return model.User.update(user,{
    //         where: { id : id },
    //         returning: true,
    //         plain: true,
    //         include: [ Creator ]
    //     });
        // return model.User.updateAttributes(user,{
        //     where: { id : id },
        //     include: [ Creator ]
        //     }
        // )
    }

    delete(id: number) {
        const Creator = model.User.hasMany(model.Address, { foreignKey: { name: 'user_id', allowNull: false }});
        return model.User.destroy({
            where: {id},
            include: [ Creator ]
        })

    }
}

export default new User();