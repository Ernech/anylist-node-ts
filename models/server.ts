import express, {Application} from 'express'
import cors from 'cors';
import db from '../db/connection';
import authRoutes from '../routes/auth';
import itemsRoutes from '../routes/items';
import userRoutes from '../routes/usuarios';
import listRoutes from '../routes/list';
import listItemRoutes from '../routes/listItem';
class Server{

    private app: Application;
    private port: string ;
    private apiPaths={
        usuarios:'/api/usuarios',
        items:'/api/items',
        auth:'/api/auth',
        list:'/api/list',
        listItem:'/api/listItem'
    }
    constructor(){
        this.app= express()
        this.port = process.env.PORT || "8000"
        this.dbConnection()
        this.middlewares()
        this.routes()
    }

    async dbConnection(){
        try {
            await db.authenticate()
            console.log("Database online");
        } catch (error) {
            throw new Error(error+'')
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors())
        //LECTURA BODY
        this.app.use(express.json())
        //CARPETA PÚBLICA
        this.app.use(express.static('public'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Servidor corriendo en pureto "+this.port);
        })
    }

    routes(){
        this.app.use(this.apiPaths.usuarios,userRoutes);
        this.app.use(this.apiPaths.items,itemsRoutes);
        this.app.use(this.apiPaths.auth,authRoutes);
        this.app.use(this.apiPaths.list,listRoutes);
        this.app.use(this.apiPaths.listItem,listItemRoutes);
    }

}


export default Server;