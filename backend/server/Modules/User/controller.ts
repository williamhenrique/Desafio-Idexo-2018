import { Request, Response } from 'express';
import User from './service';
import * as _ from 'lodash';
import {onError} from '../../api/responses/error';
import {onSuccess} from '../../api/responses/success';

class UserController {
        private UserService: User;
        constructor() { 
            this.UserService = User;
        }
    
        getAll(req: Request, res: Response) {
            this.UserService
                .getAll()
                .then(_.partial(onSuccess, res))
                .catch(_.partial(onError, res, 'Find all users failed'));
        }
    
        createUser(req: Request, res: Response) {
            this.UserService
                .create(req.body)
                .then(_.partial(onSuccess, res))
                //.catch(_.partial(dbErrorHandler, res))
                .catch(_.partial(onError, res, `Could not create user`));
        }
    
        finOnde(req: Request, res: Response) {
            this.UserService
            .getById(parseInt(req.params.id))
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Not found'));
        }

          findByemail(req: Request, res: Response) {
            this.UserService
            .getByEmail(req.params.email)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Not found'));
          }
    
          
        updateUser(req: Request, res: Response) {
            this.UserService
                .update(parseInt(req.params.id),  req.body)
                .then(_.partial(onSuccess, res))
                .catch(_.partial(onError, res, 'Update User failed'));
        }
    
        destroyUser(req: Request, res: Response) {
            this.UserService
            .delete(parseInt(req.params.id))
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'An error ocurred to delete an User'));
        }
    };
    
    export default UserController;