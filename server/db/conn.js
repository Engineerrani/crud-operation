const mongoose = require('mongoose');


const DB = "mongodb+srv://rani:1234@cluster0.wues2mw.mongodb.net/mernstack?retryWrites=true&w=majority"

mongoose.connect(DB, {
    useUnifiedTopology: true, 
    useNewUrlParser:true
    
}).then(()=> console.log("connection start")).catch((error)=>console.log(error.message))