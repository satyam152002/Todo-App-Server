
function authenticateMiddleware(req,res,next)
{
    if(req.session.user==null)
        return res.status(401).send("Unauthorized")
    next()
}

module.exports=authenticateMiddleware