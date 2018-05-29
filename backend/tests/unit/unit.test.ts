import address from '../../server/models/address';
import {testDouble, expect} from './config/helpers';
import User from '../../server/modules/User/service';
import Cart from '../../server/modules/Cart/service';
import Product from '../../server/modules/Product/service';

const model = require('../../server/models');

/******************************************************** */
/************************USUARIOS************************ */
/******************************************************** */
describe('Testes Unitarios do Controle de usuarios', () => {
    
        const defaultUser = {
            id: Math.floor((Math.random() * 999) + 1),
            name: 'Camiseta Totvs',
            description: 'Camiseta totvs 2018',
        }    

      
    
        describe('Método Create', () => {
            it('Deve criar um novo usuario', () => {
            return User.create({
                id: defaultUser.id,
                name : "Meu usuario novo",
                email : "novouasuariso@hotmail.com",
                cpf : 11133322202,
                password : "nOvUser",
                birthday : "2000-02-19",
                telephone : "11965474540",
                street : 'Nome da minha rua ',
                street_number : 'Numero XPTO',
                zipcode: '08081000',
                neighborhood : 'MEU BAIRRO',
                city : 'São Teste',
                state : 'ST'
               
            }).then(data => {
                expect(data.dataValues).to.have.all.keys(['id', 'name', 'email', 'cpf', 'password', 'rule', 'birthday', 'telephone', 'updatedAt', 'createdAt'])
            });
            });
        }); 
      
        describe('Método Update', () => {
            it('Deve alterar um usuario', () => {
            const userUpdater = {
                    id: defaultUser.id,
                    name: 'Nome usuario Atualizado',
                    telephone: '17888777',
                };
                return User.update(defaultUser.id, userUpdater)
                        .then(data => {
                            expect(data).to.be.an('Object');
                        })
            });
        });
        describe('Método GET usuarios', () => {
            it('Deve retornar uma lista de usuarios', () => {
                    return User.getAll().then(data => {
                        expect(data).to.be.an('Array');
                    })
            })
            it('Deve retornar um usuario', () => {
                return User.getById(defaultUser.id).then(data => {
                    expect(data).to.be.an('Object');
                })
            })
        }); 
        
        describe('Método Delete', () => {
            it('Deve excluir um usuario', () => {
                return User.delete(defaultUser.id).then(data => {
                    expect(data).to.be.equal(1);
                  })
            });
        });
      
}); 
    


/******************************************************** */
/************************PRODUTOS************************ */
/******************************************************** */
describe('Testes Unitarios do Controle de produtos', () => {

    const defaultProduct = {
        id: Math.floor((Math.random() * 999) + 1),
        name: 'Camiseta Totvs',
        description: 'Camiseta totvs 2018',
    }    

    describe('Método Create', () => {
        it('Deve criar um novo produto', () => {
        return Product.create({
                id: defaultProduct.id,
                name: 'Camiseta Totvs',
                description: 'Camiseta totvs 2018',
                image: 'http://www.skalojavirtual.com.br/media/catalog/product/cache/1/small_image/325x340/9df78eab33525d08d6e5fb8d27136e95/r/e/regata-santa-mao-1.jpg',
                value: 29.99,
                factor: 'A',
                rating: 5
        }).then(data => {
            expect(data.dataValues).to.have.all.keys(['name', 'id', 'description', 'image', 'value', 'factor', 'rating', 'updatedAt', 'createdAt'])
        });
        });
    }); 
    describe('Método Update', () => {
        it('Deve alterar um produto', () => {
        const productUpdater = {
            name: 'Nome Atualizado',
            description: 'Minha nova descrição'
            };
            return Product
                    .update(defaultProduct.id, productUpdater)
                    .then(data => {
                    expect(data[0]).to.be.equal(1);
                    })
        });
    });
    describe('Método GET Produtos', () => {
        it('Deve retornar uma lista de produtos', () => {
                return Product.getAll().then(data => {
                    expect(data).to.be.an('Array');
                })
        })
        it('Deve retornar um produto', () => {
            return Product.getById(defaultProduct.id).then(data => {
                expect(data).to.be.an('Object');
            })
        })
    });    
    describe('Método Delete', () => {
        it('Deve excluir um produto', () => {
            return Product.delete(defaultProduct.id).then(data => {
                expect(data).to.be.equal(1);
              })
        });
    });
}); 



/******************************************************** */
/************************CARRINHO************************ */
/******************************************************** */
describe('Testes Unitarios do Controle de carrinho', () => {

      describe('Método GET Cart', () => {
        it('Deve retornar um objeto com uma lista do carrinho', () => {
          return Cart.getCart('123456').then(data => {
            expect(data).to.be.an('Object');
          })
        })
      });
      describe('Método POST Cart', () => {
        it('Deve inserir um item ao carrinho', () => {
          return Cart.createCart({
            "product_id" : 17,
            "quantity" : 2,
            "session_id" : Math.floor((Math.random() * 999999) + 9999)
          }).then(data => {
            expect(data).to.be.an('Object');
          })
        })
      });
 })

