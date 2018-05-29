export default function(sequelize, DataTypes) {
     const Cart = sequelize.define('Cart', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true                
            },
            product_id: {
            
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            session_id: {
                type: DataTypes.STRING,
                allowNull: true                
            },
        });
       return Cart;
    };