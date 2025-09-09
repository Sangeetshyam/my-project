import express from "express"
import { loadLogin,login, loadDashboard,logout,edituser,deleteuser, addUser,search} from "../controller/adminController.js"
import {checkSession,isLogin} from "../middleware/admin.js"
let router= express.Router()

router.get('/login',isLogin,loadLogin)
router.post('/login',login)
router.get('/dashboard',checkSession,loadDashboard)
router.get('/logout',checkSession,logout)
router.post('/edituser',checkSession,edituser)
router.post('/deleteuser',checkSession,deleteuser)
router.post('/adduser',checkSession,addUser)
router.post('/search-content',checkSession,search)

export default router