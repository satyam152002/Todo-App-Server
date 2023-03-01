if(process.env.NODE_ENV!='production')
{
    require('dotenv').config()
}
//Importing Dependecies
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const session=require('express-session')
const cors=require('cors')

//importing middlewares
const authenticateMiddleware=require('./middlewares/auth.middleware')

//setting configuration
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(session({ 
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: false,
}))
app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST','PATCH','DELETE'],
    credentials:true
}))

//Configuring Database
mongoose.set('strictQuery',false)
mongoose.connect(`${process.env.DATABASE_URL}`,()=>console.log("DB connected"))

//importing routes
const authRouter=require('./routes/auth.route')
const todoRouter=require('./routes/todo.route')


//setting routes
app.use('/auth',authRouter);
app.use('/todo',authenticateMiddleware,todoRouter);


//listening
app.listen(process.env.PORT,(err)=>{
    if(!err)
        console.log(`server started at port ${process.env.PORT}`)
    else 
        console.log(err)
})