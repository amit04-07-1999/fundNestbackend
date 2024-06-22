const jwt=require('jsonwebtoken');

exports.middleware=async(req,res,next)=>{
    const token=req.headers.authorization;
    // console.log(token)
    if(!token){
        return res.status(401).json({message:"header is missing"});
    }
    const splittoken=token.split(' ')[1];
    if (!splittoken) {
        return res.status(401).json({message:"unable to split token"});
    }
    jwt.verify(splittoken,'aaaaaaaaaaaaabbbbbbbbbbbbbbbbbcccccccccccccccccccc',(err, decoded)=>{
        if (err) {
            return res.status(403).json({message:'Token is invalid'});
        }

        //decoding email and role from token
        const email=decoded.email;
        const role=decoded.role;
        if(!email){
            return res.status(400).json({message:"email not found in token"});
        }

        //setting email and role in req object
        req.email=email;
        req.role=role;
        next();
    });
};