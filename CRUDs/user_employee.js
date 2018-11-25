const express = require('express');
const Empleado = require('../models/user');
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const { verificarToken } = require('../middlewares/autentication')
//

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.post('/user_empleado', verificarToken,(req,res)=>{
    const{name,last_name,email,password} = req.body

    let nuevoEmpleado = Empleado({
        name,
        last_name,
        email,
        password: bcrypt.hashSync(password, 10),
        type: "USER_ROLE"
    });

    nuevoEmpleado.save((err,empleado)=>{
        if(err) throw err;
        res.status(201).send(empleado)
    });
});

app.get('/user_empleado',verificarToken, (req,res)=>{
    Empleado.find().exec()
    .then(empleado =>{
        res.send(empleado)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

app.get('/user_empleado/:uid',verificarToken, (req,res)=>{
    const{uid} = req.params

    Empleado.findById(uid).exec()
    .then(empleado =>{
        res.send(empleado)
    })
    .catch(err =>{
        res.status(404).send(err)
    })

});

app.put('/user_empleado/:uid', verificarToken,(req,res)=>{
    const{uid} = req.params

    Empleado.findByIdAndUpdate(uid, {$set:req.body},{new:true}).exec()
    .then(empleado =>{
        res.status(200).send(empleado)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

app.delete('/user_empleado/:uid',verificarToken, (req,res)=>{
    const{uid} = req.params

    Empleado.findByIdAndRemove(uid).exec()
    .then(empleado =>{
        res.status(200).send()
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

module.exports = app;