const mongoose=require("mongoose")

const contactSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

module.exports=new mongoose.model('contact',contactSchema)
