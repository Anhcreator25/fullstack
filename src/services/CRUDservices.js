//nhận data từ phía controller và thao tác về phía database

import bcrypt from "bcryptjs";
import db from '../models/index';



const salt = bcrypt.genSaltSync(10);


let createNewUser=async (data)=>{
    return new Promise(async(resolve,reject)=>{
        try {

            let hashPasswordFromBcrypt= await hashUserPassword(data.password);
              await db.User.create({
                  email:        data.email,
                  password:     hashPasswordFromBcrypt,
                  firstName:    data.firstname,
                  lastName:     data.lastname,
                  address:      data.address,
                  phoneNumber:  data.phoneNumber,
                  gender:       data.Sex==='1'? true : false,
                  roleID:       data.roleID,
                 
              })
                  resolve('ok create a new user succeed');


        } catch (error) {
            reject(error);
        }
    })   
}

let hashUserPassword=(password)=>{
    return new Promise(async(resolve,reject)=>{
       try {
          const hashPassword =  await bcrypt.hashSync(password, salt);
             resolve(hashPassword);
       } catch (error) {
             reject(error)
       }
    })
}
let getAllUser= ()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let users= await db.User.findAll({
                raw: true
            });
            resolve(users);
        
        } catch (error) {
            reject(error);
        }
    })
}
let getUserInforbyID=(userID)=>{
    return  new Promise( async (resolve,reject)=>{
        try {
            let user= await db.User.findOne({
                where : {id : userID},
                raw :true
            })
               if(user){
                resolve(user);
               }else{
                  resolve([])
               }

        } catch (error) {
            reject(error);
        }
    })
}
let updateUserData=(data)=>{
   return new Promise(async(resolve,reject)=>{
    try {
        let user = await db.User.findOne({
            where :{ id : data.id}
          
        })
        if(user){
            user.firstName=data.firstname;
            user.lastName=data.lastname;
            await user.save();

            let allUser= await db.User.findAll();
              resolve(allUser);
        }else{
            resolve()
        }
    } catch (error) {
        reject(error)
    }
   })
}
let deleteUserInforByID=(userID)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            let user=await db.User.findOne({
                where: {id : userID}
            })
            if(user){
                
                await user.destroy();
            }else{
                resolve();
            }
            
        } catch (error) {
            reject(error)
        }
    })

}
module.exports={
    createNewUser : createNewUser,
    getAllUser: getAllUser,
    getUserInforbyID :getUserInforbyID,
    updateUserData :updateUserData,
    deleteUserInforByID :deleteUserInforByID
}