import {Request, Response, Application} from 'express';
import UserRoutes from '../../Modules/User/routes';
import ProductRoutes from '../../Modules/Product/routes';
import CartRoutes from '../../Modules/Cart/routes';
import TokenRoutes from '../../modules/auth/auth';

class Routes{

    private user: UserRoutes;
    private product: ProductRoutes;
    private cart: CartRoutes;
    private tokenrouter: TokenRoutes;
    private auth: any;
    private facebookAuth: any;

    constructor(app: Application, auth: any, facebookAuth: any){
        this.user = new UserRoutes();
        this.product = new ProductRoutes();
        this.cart = new CartRoutes();
        this.tokenrouter = new TokenRoutes();
        this.auth = auth; 
        this.facebookAuth = facebookAuth;   
        this.getRoutes(app);
    }

    getRoutes(app: Application):void{
        //crud usuarios
        app.route('/api/user').all(this.auth.authenticate()).get(this.user.index)
        app.route('/api/user').all(this.auth.authenticate()).post(this.user.create)
        app.route('/api/user/:id').all(this.auth.authenticate()).get(this.user.finOnde)
        app.route('/api/user/email/:email').all(this.auth.authenticate()).get(this.user.findByEmail)
        app.route('/api/user/:id').all(this.auth.authenticate()).put(this.user.update)
        app.route('/api/user/:id').all(this.auth.authenticate()).delete(this.user.destroy)

        //crud produtos
        app.route('/api/product').get(this.product.index)
        app.route('/api/product').all().post(this.product.create)
        app.route('/api/product/:id').get(this.product.finOnde)
        app.route('/api/product/:id').all().put(this.product.update)
        app.route('/api/product/:id').all().delete(this.product.destroy)

        //carrinhos
        app.route('/api/cart/add').all().post(this.cart.add)
        app.route('/api/cart/:session_id').all().get(this.cart.findCart)
        
        //Simples rota de autenticação
        app.route('/api/auth').post(this.tokenrouter.auth);
        //Simples rota de autenticação
        app.route('/api/auth/admin').post(this.tokenrouter.authAdmin);
        //Rota para autenticação via facebook, utilizando o passport-facebook
        app.route('/api/auth/facebook/token').all(this.facebookAuth.authenticate()).post(this.tokenrouter.authFacebook);
       // app.route('/api/auth/facebook/token').all().post(this.tokenrouter.authFacebook);

        //Para controle do carrinho de compras
        app.route('/api/').get(function(req, res){
            res.json({session: req.sessionID})
        });

        app.route('/api/login').all(this.auth.authenticate()).post(this.tokenrouter.auth);
        
    }

}

export default Routes;