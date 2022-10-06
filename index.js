const express=require('express');
const db = require('./db.js');
const app=express();
const port=5000;

app.use(express.json());

// get data
app.get('/',async(req,res)=>{
    const users=await db('users').select("*");
    return res.send({
        users
    })
})

app.post('/',async(req,res)=>{
    try {
        const {name,email,mobile}=req.body;
        if(!name || !email || !mobile){
            return res.send({
                success:false,
                message:'Please Fill the Field'
            })
        }else{
            const users=await db('users').insert({
                name,email,mobile
            })

            return res.send({
                users,
                message:'Successfully'
            })
        }
    } catch (error) {
        return res.send({
            success:false,
            message:error.message
        })
    }
})

app.patch('/:id',async(req,res)=>{
    try{
        const users=await db('users').select('*').where('id',req.params.id).first();
        return res.send({
            users,
            message:'Successfully'
        })
    }catch(error){
        return res.send({
            success:false,
            message:error.message
        })
    }
})

app.put('/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const {name,email,mobile}=req.body;
        if(!name || !email || !mobile){
            return res.send({
                success:false,
                message:'Please Fill the Field'
            })
        }else{
            const users=await db('users').where('id',id).update({
                name,email,mobile
            })

            return res.send({
                users,
                message:'Successfully'
            })
        }
    } catch (error) {
        return res.send({
            success:false,
            message:error.message
        })
    }
})
app.listen(port, ()=>{
    console.log("Server is runing on port " + port);
})