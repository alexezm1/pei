const express = require('express');
const User = require('../models/user');
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const { verificarToken } = require('../middlewares/autentication')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.post('/user', (req,res)=>{
    const{name,last_name,email,password} = req.body

    let nuevoUser = User({
        name,
        last_name,
        email,
        password: bcrypt.hashSync(password, 10),
        type: "ADMIN_ROLE"
    });

    nuevoUser.save((err,user)=>{
        if(err) throw err;
        res.status(201).send(user)
    });
});

app.get('/user', verificarToken,(req,res)=>{
    User.find().exec()
    .then(user =>{
        res.send(user)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

app.get('/user/:uid', verificarToken,(req,res)=>{
    const{uid} = req.params

    User.findById(uid).exec()
    .then(user =>{
        res.send(user)
    })
    .catch(err =>{
        res.status(404).send(err)
    })

});

app.put('/user/:uid',verificarToken, (req,res)=>{
    const{uid} = req.params

    User.findByIdAndUpdate(uid, {$set:req.body},{new:true}).exec()
    .then(user =>{
        res.status(200).send(user)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

function deleteUser (req,res){

    let user = {
        account_delete: 1,
    };

    User.findByIdAndUpdate(req.userData.user._id, user, {new:true}, (err, UserDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:"Ocurrio un error",
            })
        }

        return res.status(200).json({
            ok:true,
            message:"Se elimino la cuenta",
        })
    })
}

app.delete('/user', verificarToken, deleteUser);

module.exports = app;