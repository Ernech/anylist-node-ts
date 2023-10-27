import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();



const db = new Sequelize(String(process.env.DB_NAME),String(process.env.DB_USER),String(process.env.DB_PASSWORD),
    {
        host:process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'mysql'
    });



db.sync().then(()=>{
    console.log('Datase created');
}).catch((error)=>{
    console.log('Unable to create database');
    console.log(error);
});


export default db





