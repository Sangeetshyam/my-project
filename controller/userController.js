
import { log } from "console"
import userSchema from "../model/usermodel.js"
import bcrypt from "bcrypt";

let saltround=10

let registerUser= async (req,res)=>{
    try{
    let{email,password}=req.body
    let user= await userSchema.findOne({email})
    if(user) return res.render("user/register",{message:"User already exist"})
       
    let hashedPassword=await bcrypt.hash(password,saltround)
    
    let newUser= new userSchema({
        email,
        password:hashedPassword
    })
    await newUser.save()

    res.redirect("/user/login?message=created")
    }
    catch(err){
        res.render('user/register',{message:"Something went wrong!"})
    }
}


let login= async(req,res)=>{
    try{
        let {email,password}=req.body
        let user =await userSchema.findOne({email})
        if(!user) return res.render('user/login',{message:"User does not exist"})
        let isMatch =await bcrypt.compare(password,user.password)
        if(!isMatch) return res.render('user/login',{message:"Incorrect password"})
        req.session.user=true
        res.redirect("/user/home?message=login")
    }
    catch(err){
        res.render('user/login',{message:"Something went wrong!"})
    }
}

let loadHome= async(req,res)=>{
   let {message}= req.query
   res.render('user/home',{message})
}
let loadLogin= async (req,res)=>{
    let {message} = req.query
    
    res.render('user/login',{err:message})
}
let loadRegister=async (req,res)=>{
    res.render('user/register')
}
let logout= async(req,res)=>{
    req.session.user=null
    res.redirect('/user/login')
}


export { registerUser,login,loadHome,loadLogin,loadRegister,logout}