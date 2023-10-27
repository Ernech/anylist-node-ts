import { Request } from "express";
import Item from "../models/items"
import List from "../models/list";


export const itemExistsById = async (itemId: string, req:Request) => {
    const { user } = req;
    const item = await Item.findOne({
        where: {
            id: itemId,
            isActive: true,
            userId: user?.id,
        },
    });

    if (!item) {
        throw new Error(`Item with the ID ${itemId} doesn't exist`);
    }
};

// export const listExistsById = async(listId:string)=>{

//    const {user} = req;

//     const item = await List.findOne({where:{
//         id:listId,
//         status:true,
//          userId:user?.id
//     }});



//     if(!item){
//         throw new Error(`List with the ${listId} doesn't exits`)
//     }

// }

