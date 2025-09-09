
import asyncHandler from "express-async-handler"
import adminmodel from "../model/adminmodel.js"
import bcrypt from 'bcrypt'
import usermodel from "../model/usermodel.js"

let loadLogin=asyncHandler((req,res)=>{

    
    res.render('admin/login')
})
let login=asyncHandler(async(req,res)=>{
    
    
    let {email,password}=req.body
    let admin=await adminmodel.findOne({email})
    if(!admin) return res.render('admin/login',{message:"Invalid credentials"})
    let isMatch= await bcrypt.compare(password,admin.password)
    if(!isMatch) return res.render('admin/login',{message:"Incorrect password"})

    req.session.admin=true
    res.redirect('/admin/dashboard?message=success')
})

let loadDashboard=asyncHandler(async(req,res)=>{
    let {message}=req.query
    
    let user =await usermodel.find({})

    res.render('admin/dashboard',{user,message})

})

let logout=asyncHandler(async(req,res)=>{
    req.session.admin=null
    res.redirect('/admin/login')
})
let edituser= asyncHandler(async(req,res)=>{
    let {userId,email,password}=req.body
    let hashedPassword= await bcrypt.hash(password,10)
    await usermodel.findOneAndUpdate({_id:userId},{$set:{email,password:hashedPassword}})
    res.redirect('/admin/dashboard')
})
let deleteuser=asyncHandler(async(req,res)=>{
    let {userId}=req.body
    await usermodel.findOneAndDelete({_id:userId})
    res.redirect('/admin/dashboard')
})

let addUser=asyncHandler(async(req,res)=>{
    try{
        let {email,password}=req.body
    let hashedPassword=await bcrypt.hash(password,10)
    let newuser= new usermodel({
        email,
        password:hashedPassword
    })
    await newuser.save()
    res.redirect('/admin/dashboard')
    }
    catch(err){
        throw(err)
    }
})
let search= asyncHandler(async(req,res)=>{
    try{
       let {search}= req.body
       console.log(req.body)
       let user=await usermodel.findOne({email:search})
       console.log(user)
       res.render('admin/dashboard',{user:[user]})

    }catch(err){
        throw err
    }
})


export {loadLogin,login,loadDashboard,logout,edituser,deleteuser,addUser,search}