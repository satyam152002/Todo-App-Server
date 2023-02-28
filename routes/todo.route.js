const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')

//importing models
const Todo=require('./../model/todo.model')
//routes

router.get('/',async (req,res)=>{
    const userID=req.session.user?.id
    try
    {
        let todos=await Todo.find({user:userID})
        return res.status(200).json(todos)
    }
    catch(e)
    {
        console.log(e.message)
        return res.status(500).send("Server Error")
    }
})


router.post('/', async (req,res)=>{
    const { task,todoID }=req.body
    if(task==null)
        return res.status(400).send("Invalid Request")
    try
    {
        const userID=req.session.user?.id;
        let todo=new Todo({
            task:task,
            user:userID,
            todoID:todoID
        })
        todo=await todo.save()
        console.log(todo)
        return res.status(201).json(todo)
    }
    catch(e)
    {
        console.log(e)
        return res.sendStatus(500)
    }
})


router.patch('/:id',async (req,res)=>{
    const { completed } =req.body
    const todoID=req.params.id
    try
    {
        let todo=await Todo.findOne({todoID:todoID})
        if(todo==null)
            return res.status(400).send(`No Todo Exists With ID :${todoID}`)
        if(todo.user!=req.session.user?.id)
            return res.status(403).send("Forbidden")
        todo.completed=completed;
        todo=await todo.save()
        return res.status(200).json(todo)
    }
    catch(e)
    {
        console.log(e.message);        
        return res.sendStatus(500)
    }

})

module.exports=router