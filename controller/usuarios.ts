import { Request, Response } from "express";
import Usuario from "../models/usuario";
import bcrypt from "bcrypt";

export const getUsuarios = async( req: Request, res:Response )=>{
    
    const usuarios = await Usuario.findAll({where:{
        status: true
    }});
    
    res.json({usuarios})
}


export const getUsuarioPorId = async( req: Request, res:Response )=>{

    const {id} = req.params
    const usuario = await Usuario.findByPk(id)
    if(usuario){
        res.json(usuario)
    }
    else{
        res.status(404).json({msg:`No existe el usuario con el id: ${id}`})
    }

}

export const postUsuario = async( req: Request, res:Response )=>{


    const { body } = req;

    try {
        const existeEmail = await Usuario.findOne({
            where:{
                email: body.email
            }
        })

        if(existeEmail){
            return res.status(400).json({msg:`Ya existe un usuario con el email ${body.email}`})
        }

        const salt = bcrypt.genSaltSync(10);
        const cryptedPassword = bcrypt.hashSync(body.password,salt);
        body.password = cryptedPassword;
        const usuario =  await Usuario.create(body);
        await usuario.save()
        res.status(201).json({ok:true,
            usuario,
            msg:'User created'
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Hable con el administrador"})
    }
    

}

export const putUsuario = async( req: Request, res:Response )=>{

    const { id } =req.params

    const { body } = req

    try {
        const usuario = await Usuario.findByPk(id)
        if(!usuario){
            return res.status(404).json({msg:`No existe el usuario con el id: ${id}`})
        }

        await usuario.update(body)
        return res.json(usuario)

    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Hable con el administrador"})
        
    }


}

export const deleteUsuario = async( req: Request, res:Response )=>{

    const {id} = req.params

    const usuario = await Usuario.findByPk(id)
    if(!usuario){
        return res.status(404).json({
            msg:`No existe el usuario con el id: ${id}`
        })
    }

    //await usuario.destroy()
    await usuario.update({status: false})
    res.json({msg:`El usuario con el id ${id} fue eliminado`})


}