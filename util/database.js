const mongoose = require('mongoose')

const makeDBConnection = async (url)=>{
   try{
    await mongoose.connect(url);
    console.log('connected to database');
   }
   catch(err){
       console.log('Error occured: ',err);
   }
}

module.exports = {
    makeDBConnection
}