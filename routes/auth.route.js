const express=require('express')
const router=express.Router();

//importing models
const User=require('./../model/user.model')

//routes

router.get('/', async (req,res)=>{

    let users=await User.find({})
    return res.status(200).json(users)
})

router.post('/register',async (req,res)=>{
    const{firstname,lastname,username,email,password}=req.body;
    if(firstname==null||lastname==null||username==null||email==null||password==null)
        return res.status(400).send("Invalid Request")

    let user=await User.findOne({username:username})
    if(user!==null) 
        return res.status(400).send("Username Already Taken");
    user=await User.findOne({email:email})
    if(user!==null)
        return res.status(400).send("Email Already Taken");
    try
    {
        let newUser=new User({
            firstname:firstname,
            lastname:lastname,
            username:username,
            email:email,
            password:password
        })
        newUser=await newUser.save()
        return res.status(201).send("Account Created Successfully")
    }
    catch(e)
    {
        console.log(e)
        return res.status(500).send(e.message)
    }
})

router.post('/login',async (req,res)=>{
    const {username,password}=req.body;

    console.log(req.body)
    if(username==null||password==null)
        return res.status(400).send("Invalid Request")
    try
    {
        let user=await User.findOne({username:username})
        if(user==null)
            return res.status(400).send("Username Does Not Exist")
        if(user.password!==password)
            return res.status(400).send("Invalid Password")
        req.session.user={name:user.name,email:user.email,id:user._id}
        return res.status(200).json({
            username:username,
            email:user.email,
            firstname:user.firstname,
            lastname:user.lastname
        })
    }
    catch(e)
    {
        return res.status(500).send(e.message)
    }
})


module.exports=router