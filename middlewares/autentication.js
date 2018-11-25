const jwt = require("jsonwebtoken");
const User = require("../models/user");

function verificarToken(req, res, next) {

    let token = req.get("token");

    jwt.verify(token, process.env.SEED, (err,decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err: {
                    message:"Token no valido"
                },
            })
        }


        User.findById(decoded.user._id,(err,user)=>{
            if(err)
                return res.status(400).json({
                    ok:false
                });

            if(user.account_delete)
                return res.status(404).json({
                   ok:false,
                   message:"El usuario fue eliminado",
                });
        });
        req.userData = decoded;
        next();
    });
}

module.exports = {
    verificarToken,

};