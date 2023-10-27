import { Request, Response } from "express";
import ListItem from "../models/listItem";

export const createListItem = async(req:Request, res:Response)=>{

    const {body} = req;
    const {listId,itemId} = req.params;

    try {
        const newListItem = await ListItem.create({...body, listId,itemId});
        await newListItem.save()
        res.status(201).json({ok:true, listItem: newListItem})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false, msg:'There was a server error, talk with the people in charge'});
    }


}

export const completeListItem = async(req:Request, res:Response)=>{

    const { id } = req.params;
    try {

        const modifyListItem = await ListItem.update({completed:true},{where:
            {
                id,
            status:true
            }
        })

        if(modifyListItem[0]===0){
            return res.status(404).json({ok:false, msg: `List item with the id ${id} doesn't exists`})
        }

        const listItemCompleted = await ListItem.findByPk(id);
        res.status(201).json({ok:true, listItem:listItemCompleted});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false, msg:'There was a server error, talk with the people in charge'});
    }


}


export const modifyListItem = async(req:Request, res:Response)=>{
    const {body} = req;
    const {id,listId,itemId} = req.params;


    try {

        const modifyListItem = await ListItem.update({...body,listId,itemId},{where:
            {
                id,
            status:true
            }
        })

        if(modifyListItem[0]===0){
            return res.status(404).json({ok:false, msg: `List item with the id ${id} doesn't exists`})
        }

        const listItemCompleted = await ListItem.findByPk(id);
        res.status(201).json({ok:true, listItem:listItemCompleted});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false, msg:'There was a server error, talk with the people in charge'});
    }



}