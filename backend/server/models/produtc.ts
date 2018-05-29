import produtc from "./produtc";
export default function(sequelize, DataTypes) {
    const Product = sequelize.define("Product", {
           id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true
           },
           name: {
               type: DataTypes.STRING,
               allowNull: false,
               validate: {
                   notEmpty: true
               }
           },
           description: {
               type: DataTypes.STRING,
               allowNull: false             
           },
           image: {
               type: DataTypes.STRING,
               allowNull: false
           },
           value: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
           },
           factor: {
               type: DataTypes.ENUM("A", "B", "C"),
               allowNull: false,
               validate: {
                   notEmpty: true
               }
           },
           rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
       });

       Product.beforeCreate( produtc => validateRating(produtc) );
       
       Product.beforeUpdate( produtc => validateRating(produtc) );
       
       function validateRating(produtc) {
        
            if(produtc.rating){
                produtc.rating =  (produtc.rating > 5) ? 5 : produtc.rating
            }else{
                produtc.rating = 0
            }

            produtc.set("rating", produtc.rating);
        }

       return Product;
   };