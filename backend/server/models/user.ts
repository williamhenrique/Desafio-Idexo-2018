import * as bcrypt from 'bcrypt';
export default function(sequelize, DataTypes) {
     const User = sequelize.define('User', {
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
            cpf: {
                type: DataTypes.BIGINT,
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            birthday: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            telephone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            rule: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    notEmpty: true
                },
                defaultValue: 'user'
            },
            
        }, {
            classMethods: {
              validatePassword: (encryptedPassword, password) => bcrypt.compareSync(password, encryptedPassword)
            }
          });
    
    User.beforeCreate( user => hashPass(user) );
    
    User.beforeUpdate( user => hashPass(user) );
    
    function hashPass(user) {
        const salt = bcrypt.genSaltSync(10);
        user.set('password', bcrypt.hashSync(user.password, salt));
    }
    return User;
        
    };