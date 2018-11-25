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

app.delete('/user/:uid',verificarToken, (req,res)=>{
    const{uid} = req.params

    User.findByIdAndRemove(uid).exec()
    .then(user =>{
        res.status(200).send()
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

module.exports = app;