const jwt = require('jsonwebtoken');

function authenicateToken(req, res, next){
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json({msg:"No token, authorization denied"});
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err) return res.status(401).json({msg:"Token is not valid"});
        req.user = decoded;
        next();
    });
}

// teste autotization
app.get('/test', authenicateToken, (req, res)=>{
    res.json({msg:"Autotization test passed",userId: req.user.id});
})