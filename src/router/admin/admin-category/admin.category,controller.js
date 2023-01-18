module.exports = {
    httpGetCategoryPage:(req,res)=>{
        return res.render('admin/admin-category',{
            layout:'admin/admin-layout',
            adminTrue:req.session.admin 
        })
    }
}