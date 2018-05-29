import * as bcrypt from 'bcrypt';
export default function(sequelize, DataTypes) {
     const Address = sequelize.define('Address', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                foreignKey: true,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
            ,
            street: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
            , street_number: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            zipcode: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            neighborhood: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: 'br'
            }
        });
        return Address;
    };