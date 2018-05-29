import {Request, Response} from 'express';
import * as jwt from 'jwt-simple';

const config = require('../../config/env/config')();
const bcrypt = require('bcrypt');

export function authSuccess(res: Response, creadentials:any, data: any){
    
    const isMatch = bcrypt.compareSync(creadentials.password, data.password);
   
    if(isMatch){
      const payload = {id: data.id, rule: data.rule};
      res.json({
        token: jwt.encode(payload, config.secret)
      });
    } else {
      res.sendStatus(401);
    }
}

export function authEmailSuccess(res: Response, creadentials:any, data: any){
  if(creadentials.email && data.id){
    const payload = {id: data.id, rule: data.rule};
    res.json({
      token: jwt.encode(payload, config.secret)
    });
  } else {
    res.sendStatus(401);
  }
}

export function authFail(req: Request, res: Response){
  res.sendStatus(400);
}