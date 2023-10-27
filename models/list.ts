import { DataTypes, ForeignKey, Model, Optional } from "sequelize";
import db from "../db/connection";
import Usuario from "./usuario";

interface ListAttributes{

    id:string;
    name:string;
    status:boolean;
    userId: ForeignKey<string>;
}

interface ListCreationAttributes extends Optional<ListAttributes, 'id'>{}

class List extends Model<ListAttributes,ListCreationAttributes> implements ListAttributes{

    public id!:string;
    public name!:string;
    public status!:boolean;
    public userId!: string;

}

List.init({ 
    id:{
        type: DataTypes.STRING,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4
    },
    name:{
        type: DataTypes.STRING
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    tableName:'list',
    sequelize:db,
    timestamps:true  
});

List.belongsTo(Usuario,{foreignKey:'userId'});
Usuario.hasMany(List,{foreignKey:'userId'})

export default List;





