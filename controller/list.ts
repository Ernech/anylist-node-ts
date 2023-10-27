import { Request, Response } from "express";
import List from "../models/list";
import Item from "../models/items";
import ListItem from "../models/listItem";

export const postList = async(req:Request, res:Response)=>{

    const {user, body} = req; 

    try {

        const newList =  await List.create({...body,userId:user?.id});
        await newList.save();
        res.status(201).json({ok:true, list:newList});

    } catch (error) {
        res.status(500).json({ok:false,msg:'There was an error, talk with the people in charge'});
    }
    
}

export const getLists=async(req:Request, res:Response)=>{
        const {user} = req;
    try {
        const list = await List.findAll({where:{userId:user?.id,status:true}});
        res.status(200).json({ok:true, list, listCount:list.length});

    } catch (error) {
        res.status(500).json({ok:false,msg:'There was an error, talk with the people in charge'})
    }

}


export const updateList = async(req:Request, res:Response)=>{

    const { user,body } = req;
    const { id } = req.params;
    try {
        const listUpdated = await List.update({...body},{where:{
            id,
            userId:user?.id,
            status:true
        }});
        if(listUpdated[0]===0){
            return res.status(404).json({ok:false, msg:`The list with the id: ${id} does not exists`})            
        }
        const list = await List.findByPk(id);
        res.status(201).json({ok:true, list });
    } catch (error) {
        res.status(500).json({ok:false,msg:'There was an error, talk with the people in charge'})
    }
}


export const deleteList = async(req:Request, res:Response)=>{
    const { user } = req;
    const { id } = req.params;
    try {
        const listUpdated = await List.update({status:false},{where:{
            id,
            userId:user?.id,
            status:true
        }});
        if(listUpdated[0]===0){
            return res.status(404).json({ok:false, msg:`The list with the id: ${id} does not exists`})            
        }
        const list = await List.findByPk(id);
        res.status(201).json({ok:true, list });
    } catch (error) {
        res.status(500).json({ok:false,msg:'There was an error, talk with the people in charge'})
    }
}

export const getListByIdWithTheirItems = async(req:Request,res:Response)=>{

    const {id} = req.params;
    const {user} = req;

    try {
        
        const list = await List.findOne({
            where:{userId:user?.id, id,status:true},
            include:[{
                model:ListItem,
                where:{status:true},
                include:[{
                    model:Item,
                    where:{isActive:true,userId:user?.id}
                }]
            }]
        });
        if(!list){
            return res.status(404).json({ok:false,msg:`The list with the id ${id} was not found`})
        }

        res.status(200).json({ok:true, list})

    } catch (error) {
        res.status(500).json({ok:false,msg:'There was an error, talk with the people in charge'})
    }


}

