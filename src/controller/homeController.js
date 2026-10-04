import db from '../models/index'
import CRUDServices from '../services/CRUDservices'

let getHomePage = async (req,res)=>{

  try{

    let 
    data =  await db.User.findAll();

    console.log('-----------------------');
    console.log(data)
    console.log('-----------------------');

    return res.render('homepage.ejs',{
           data: JSON.stringify(data)
    });

  }catch (e){
    console.log(e);

  }
};

let getCRUD= (req,res)=>{
  return res.render('crud.ejs')
}

let postCRUD= async(req,res)=>{
  let message=await CRUDServices.createNewUser(req.body);
  console.log(message);
  return res.send("post crud");
}

let displayCRUD= async(req,res)=>{
  let data= await CRUDServices.getAllUser();
    console.log('-----------------------');
    console.log(data)
    console.log('-----------------------');

   return res.render('display-crud.ejs',{
    dataTable :data
   })
}
let editCRUD=async(req,res)=>{
   
   let userID=req.query.id;
    console.log(userID);

   if(userID){
    let userData= await CRUDServices.getUserInforbyID(userID);
    console.log("------------------")
    console.log(userData);
     return res.render('edit-crud.ejs',{
       user : userData
     })
   }else{
     return res.send("User not found !")
   }
   
  
}
let putCRUD=async(req,res)=>{
  let data =req.body;
   let alluser=await CRUDServices.updateUserData(data);
  return res.render('display-crud.ejs',{
     dataTable: alluser
  })

}
let deleteCRUD=async(req,res)=>{
  let userID=req.query.id;
 await CRUDServices.deleteUserInforByID(userID);
 return res.render('display-crud.ejs')
}

module.exports={
    getHomePage: getHomePage,
    getCRUD :getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD :deleteCRUD

}