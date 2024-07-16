const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
            if(err) res.status(400).json("Token is not valid!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You  are not authenticated!")
    }
}


const verifyTokenAuth = (req, res, next) =>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.IsAdmin){
            next();
        } else {
            res.status(403).json("You are not alowed to do that!")
        }
    })
}

const verifyTokenAuthAdmin = (req, res, next) =>{
    verifyToken(req, res, ()=>{
        if(req.user.IsAdmin){
            next();
        } else {
            res.status(403).json("You are not alowed to do that!")
        }
    })
}

module.exports = { 
    verifyToken , 
    verifyTokenAuth , 
    verifyTokenAuthAdmin 
};