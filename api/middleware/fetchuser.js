const jwt=require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser=(req,res,next)=>{


    const token=req.header('auth-token');
    if(!token)
    {
        res.status(200).json({success:false, message: "Error! Token was not provided."});
    }
     try{
        const decodeTooken= jwt.verify(token , JWT_SECRET,);
        req.id=decodeTooken.user_id;
        next();
     }
     catch(error){
        res.status(200).json({success:false, message: "Error! Invalid token."});
     }
};


module.exports=fetchuser;