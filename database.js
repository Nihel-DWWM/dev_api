const mongoose = require('mongoose');

module.exports=async ()=>{

    try{

    await mongoose.connect('mongodb://localhost:27017/dev_api')

    console.log("connexion réussie")
   
    }

    catch(err){

        throw err

    }
}