
let checkSession=(req,res,next)=>{
    if(req.session.admin){
        next()
    }else{
        res.redirect('/admin/login')
    }
}
let isLogin=(req,res,next)=>{
    if(req.session.admin){
        res.redirect('/admin/dashboard')
    }
    else{
        next()
    }
}

export {checkSession,isLogin}