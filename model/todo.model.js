const mongoose=require('mongoose')
const User=require('./user.model')

const todoSchema=new mongoose.Schema({
    task:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    dueDate:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports=mongoose.model('Todo',todoSchema)