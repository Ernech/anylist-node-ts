import { DataTypes, ForeignKey, Model, Optional } from "sequelize";
import db from "../db/connection";
import Item from "./items";
import List from "./list";

interface ListItemAttributes{
    id:string,
    quantity:number;
    completed:boolean;
    status:boolean;
    listId:ForeignKey<string>;
    itemId:ForeignKey<string>;
}


interface ListItemCreationAttributes extends Optional<ListItemAttributes,'id'| 'status'>{}


class ListItem extends Model<ListItemAttributes,ListItemCreationAttributes> implements ListItemAttributes{

    public id!:string;
    public quantity!: number;
    public completed!: boolean;
    public status!: boolean;
    public listId!: string;
    public itemId!: string;
}

ListItem.init({
    id:{
        type:DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    quantity:{
        type: DataTypes.FLOAT,
    },
    completed:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    tableName:'listItem',
    sequelize:db,
    timestamps:true
});

Item.hasMany(ListItem,{foreignKey:'itemId'});
List.hasMany(ListItem,{foreignKey:'listId'});
ListItem.belongsTo(Item,{foreignKey:'itemId'});
ListItem.belongsTo(List,{foreignKey:'listId'});

export default ListItem;

