const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const express = require('express');
const app = express();

function login(req, res){
    let body = req.body;

    User.findOne({email: body.email},(err,usuarioDB) =>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if ( !usuarioDB ){
            return res.status(400).json({
                ok:false,
                message:"Usuario o contraseña incorrectos",
                err
            });
        }

        if( !bcrypt.compareSync(body.password, usuarioDB.password) ){
            return res.status(400).json({
                ok:false,
                message:"Usuario o contraseña incorrectos",
                err
            });
        }

        let token = jwt.sign({
            user:usuarioDB

        }, process.env.SEED,
            {expiresIn: "31d" }
        );

        return res.status(200).json({
            ok:true,
            user:usuarioDB,
            token:token
        });
    });
}

function auth(req, res){
    let token = req.get("token");

    jwt.verify(token, process.env.SEED, (err,decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err: {
                    message:"Token no valido"
                },
            });
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

            return res.status(200).json({
                ok:true,
                
            })
        });
    });
}

app.post('/login', login)
app.get('/auth', auth)

module.exports = app;