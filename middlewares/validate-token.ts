import { NextFunction, Request, Response, } from "express"
import jwt from 'jsonwebtoken';
import { PayloadInterface } from "../interfaces/PayloadInterface";
import Usuario from "../models/usuario";
import { Model } from "sequelize";

declare module "express-serve-static-core" {
    interface Request {
      user?: Usuario;
    }
  }

const validateToken = async(req:Request, res:Response, next:NextFunction):Promise<void>=>{

    const token = req.header('x-token');

    if(!token){
        res.status(401).json({ok:false, msg:'Invalid token'});
        return;
    }

    try {
     
       const {uid} =  jwt.verify(token+'', process.env.SECRET_KEY+'') as PayloadInterface; 
        
       const user = await Usuario.findOne({where:{id:uid,status:true}});
       if(!user){
            res.status(404).json({ok:false, msg:'User not found'})
            return;
       }

       req.user = user;
        next();
    } catch (error:any) {
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ ok: false, msg: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            res.status(401).json({ ok: false, msg: 'Token has expired' });
        } else {
            console.error(error);
            res.status(500).json({ ok: false, msg: 'Server error' });
        }
    }

}

export default validateToken;