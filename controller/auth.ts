import { Request, Response } from "express"
import Usuario from "../models/usuario"
import bcrypt from 'bcrypt';
import generateJWT from "../helpers/generateJwt";

export const login = async (req:Request, res:Response)=>{

    const {email, password} = req.body;

    const usuario = await Usuario.findOne({where:{email,status:true}});
    if(!usuario){
            res.status(404).json({ok:false,msg:'User Not found'});
            return;
    }   
    const matchPasswords = bcrypt.compareSync(password, usuario.password)
    
    if(!matchPasswords){
        res.status(404).json({ok:false,msg:'Wrong credentials'});  

    }

    const token = await generateJWT(usuario?.id, usuario.roles);

    return res.status(200).json({ok:true, token, msg:'Login succesfull'})




}