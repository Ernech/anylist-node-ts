import jwt from 'jsonwebtoken';

const generateJWT =(uid:string, roles:string) =>{

    
    return new Promise((resolve,reject)=>{
        const payload = {uid,roles};
        jwt.sign(payload,process.env.SECRET_KEY+'',{expiresIn:'4h'}, function(err,token){
            if(err){
                console.log('There was an error generating the token:' , err);
                reject(err);
            }
            else{
                resolve(token);
            }
        });
    }) 

}


export default generateJWT;
