
let checkSession=(req,res,next)=>{
    if(req.session.user){
        next()
    }
    else{
        res.redirect('/user/login')
    }
}

let isLogin=(req,res,next)=>{
    if(req.session.user){
        res.redirect('/user/home')
    }
    else{
        next()
    }
}

export {checkSession,isLogin}