if(process.env.NODE_ENV!='production')
{
    require('dotenv').config()
}
//Importing Dependecies
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const session=require('express-session')

//setting configuration
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(session({ 
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: false,
}))

//Configuring Database
mongoose.connect(`${process.env.DATABASE_URL}`,()=>console.log("DB connected"))

//importing routes

//setting routes


//listening
app.listen(process.env.PORT||3000,(err)=>{
    if(!err)
        console.log(`server started at port ${process.env.PORT}`)
    else 
        console.log(err)
})