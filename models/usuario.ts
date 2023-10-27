import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import { UserIntpuInterface } from '../interfaces/UsersIterface';

class Usuario extends Model<UserIntpuInterface> implements UserIntpuInterface{
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public roles!: string;
    public status!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Usuario.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    roles: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps:true,
    sequelize: db,
    tableName:'user'
})

export default Usuario;

