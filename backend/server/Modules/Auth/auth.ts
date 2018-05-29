import {Request, Response} from 'express';
import * as _ from 'lodash';
import User from '../User/service';
import {authSuccess, authFail, authEmailSuccess} from '../../api/responses/auth';
const UserService = User;

class TokenRoutes {

    auth(req: Request, res: Response) {
      const credentials = {
        email: req.body.email,
        password: req.body.password
      }


      if (credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')) {
        UserService
          .getByEmail(credentials.email)
          .then(_.partial(authSuccess, res, credentials))
          .catch(_.partial(authFail, req, res));
      }
    }

    authAdmin(req: Request, res: Response) {
      const credentials = {
        email: req.body.email,
        password: req.body.password
      }
      if (credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')) {
        UserService
          .getByEmail(credentials.email, 'admin')
          .then(_.partial(authSuccess, res, credentials))
          .catch(_.partial(authFail, req, res));
      }
    }

    authFacebook(req: Request, res: Response) {
      const credentials = {
        email: req.body.email
      }

      if (credentials.hasOwnProperty('email')) {
        UserService
          .getByEmail(credentials.email)
          .then(_.partial(authEmailSuccess, res, credentials))
          .catch(_.partial(authFail, req, res));
      }
    }
}

export default TokenRoutes;