import express from "express"
import {registerUser,login ,loadHome,loadLogin,loadRegister,logout} from "../controller/userController.js"
import {checkSession,isLogin} from "../middleware/auth.js"
import { log } from "console"
let router= express.Router()

router.get("/login",isLogin,loadLogin)
router.post('/login',login)

router.get('/register',isLogin,loadRegister)
router.post('/register',registerUser)

router.get('/home',checkSession,loadHome)
router.get('/logout',checkSession,logout)
export default router


