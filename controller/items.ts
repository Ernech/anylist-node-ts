import { Request, Response } from "express"
import Item from "../models/items";
import ListItem from "../models/listItem";
import List from "../models/list";

export const postItem = async(req:Request, res:Response)=>{

    const {body, user} = req;
    
    const newItem = await Item.create({...body, userId:user?.id});
    await newItem.save();
    res.status(201).json({ok:true,item:newItem, msg:'Item created'})

}

export const getItems = async(req:Request, res:Response)=>{

    try {

        
    const {user} = req;
    
    const items = await Item.findAll({
        where:{
            userId: user?.id,
            isActive:true
        }
    });

    res.status(200).json({ok:true,itemsCount:items.length,items});
        
    } catch (error) {
        res.status(500).json({ok:false,msg:'There was an error, talk with the people in charge'})
    }
}

export const updateItem=async(req:Request, res:Response)=>{
    const { user } = req;
    const { id } = req.params;

    try {
        const itemUpdated = await Item.update({...req.body},{
            where: {
                isActive:true,
                userId:user?.id,
                id
            }
        });
        
        if(itemUpdated[0]===0){
            return res.status(404).json({ok:false, msg:`The item with the id: ${id} does not exists`})            
        }
        res.status(200).json({ok:true, item:itemUpdated});
    
    } catch (error) {
        res.status(500).json({ok:false,msg:'There was an error, talk with the people in charge'})
    }

}


export const deleteItem = async(req:Request, res:Response)=>{
    
    const { user } = req;
    const { id } = req.params;

    try {
        const itemUpdated = await Item.update({isActive:false},{
            where: {
                isActive:true,
                userId:user?.id,
                id
            }
        });
        
        if(itemUpdated[0]===0){
            return res.status(404).json({ok:false, msg:`The item with the id: ${id} does not exists`})            
        }
        res.status(200).json({ok:true, msg:`The item with the id: ${id} has been deleted`});
    
    } catch (error) {
        res.status(500).json({ok:false,msg:'There was an error, talk with the people in charge'})
    }
}


export const getItemsByListId=async(req:Request, res:Response)=>{
    const { id } = req.params;
    const { user } = req;

    try {
        const items = await Item.findAll({
            where:{isActive:true},
            include: [
                {
                  model: ListItem,
                  where: { listId: id, status:true },
                  include: [
                    {
                      model: List,
                      where:{userId:user?.id, status:true}
                    },
                  ],
                },
              ],
        
        })

        res.status(200).json({ok:true,items});
        
    } catch (error) {
        res.status(500).json({ok:false,msg:'There was an error, talk with the people in charge'})
    }
}