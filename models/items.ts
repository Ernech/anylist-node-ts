import { DataTypes, Model, ForeignKey, Optional } from 'sequelize';
import db from '../db/connection';
import Usuario from './usuario';


interface ItemAttributes {
    id: string;
    name: string;
    quantityUnits: string;
    isActive: boolean;
    userId: ForeignKey<string>; // Define the foreign key
}

interface ItemCreationAttributes extends Optional<ItemAttributes, 'id'> {}

class Item extends Model<ItemAttributes, ItemCreationAttributes> implements ItemAttributes {
    public id!: string;
    public name!: string;
    public quantityUnits!: string;
    public isActive!: boolean;
    public userId!: string; // This property represents the foreign key

    // Timestamps and other attributes can be defined here if needed.
}

Item.init({  id:{
    type:DataTypes.STRING,
    primaryKey:true,
    defaultValue:DataTypes.UUIDV4
},
name:{
    type: DataTypes.STRING,
},
quantityUnits:{
    type: DataTypes.STRING
},
isActive:{
    type:DataTypes.BOOLEAN,
    defaultValue:true,
}
}
,{
    sequelize:db,
    tableName:'item',
    timestamps:true
})

Item.belongsTo(Usuario, { foreignKey: 'userId' }); 
Usuario.hasMany(Item, { foreignKey: 'userId' });
export default Item;