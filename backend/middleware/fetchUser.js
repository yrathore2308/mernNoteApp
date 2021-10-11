const jwt=require('jsonwebtoken');
const SECRET_KEY='mycustomsignature'

const fetchUser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {
        const verificationString=jwt.verify(token,SECRET_KEY);
    req.user=verificationString.user;
    next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"})

    }


}
module.exports=fetchUser;