import {Request, Response} from 'express';
import UserController from './controller';
let UserCtrl: UserController;
class UserRoutes {
    
    constructor(){
        UserCtrl = new UserController();
    }
    index(req: Request, res:Response){
       return UserCtrl.getAll(req, res); 
    }
    create(req: Request, res:Response){
        return UserCtrl.createUser(req, res); 
    }
    finOnde(req: Request, res:Response){
        return UserCtrl.finOnde(req, res); 
    }
    findByEmail(req: Request, res:Response){
        return UserCtrl.findByemail(req, res); 
    }
    update(req: Request, res:Response){
        return UserCtrl.updateUser(req, res); 
    }
    destroy(req: Request, res:Response){
        return UserCtrl.destroyUser(req, res); 
    }
}

export default UserRoutes;