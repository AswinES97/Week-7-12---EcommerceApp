module.exports = {
    userLoggedIn:(req,res,next)=>{
        if(req.session.user){
            return next()
        }else{
            return res.redirect('/')
        }
    },
    userNotLoggedIn:(req,res,next)=>{
        if(req.session.user){
            return res.redirect("/v1/users")
        }else{
            return next()
        }
    },
    adminNotLoggedIn:(req,res,next)=>{
        if(req.session.admin){
            return next()
        }else{
            return res.redirect('/v1/admin/admin-login')
        }
    },
    adminLoggedIn:(req,res,next)=>{
        if(req.session.admin){
            return res.redirect('/v1/admin/')
        }else{
            return next()
        }
    }
}