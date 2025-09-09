import express from "express"
let app = express()
import {connectDB} from "./db/connecttDB.js"
import path from "path"
import nocache from "nocache"
import session from "express-session"
import userRoutes from "./Routes/user.js"
import adminRoutes from "./Routes/admin.js"
const __dirname = import.meta.dirname;

app.use(nocache())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret:"mysecretkey",
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*24 
    }
}))

app.set('views',path.join(__dirname,'views'))
app.set('view engine','hbs')
app.use(express.static('public'))

connectDB()

app.get('/',(req,res)=>{
    res.redirect('user/register')
})

app.use('/user',userRoutes)
app.use('/admin',adminRoutes)

app.listen(3000,()=>{
    console.log("Server is running");
})