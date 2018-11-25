const express = require('express');
const Cliente = require('../models/cliente');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { verificarToken } = require('../middlewares/autentication')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.post('/cliente',verificarToken,(req,res)=>{
    const{name} = req.body

    let nuevoCliente = Cliente({
        name
    });

    nuevoCliente.save((err, cliente)=>{
        if(err) throw err;
        res.status(201).send(cliente)
    });
});

app.get('/cliente',verificarToken,(req,res)=>{
    Cliente.find().exec()
    .then(cliente =>{
        res.send(cliente)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

app.get('/cliente/:uid',verificarToken, (req,res)=>{
    const{uid} = req.params

    Cliente.findById(uid).exec()
    .then(cliente =>{
        res.send(cliente)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

app.put('/cliente/:uid',verificarToken,(req,res)=>{
    const{uid} = req.params

    Cliente.findByIdAndUpdate(uid, {$set:req.body},{new:true}).exec()
    .then(ciente=>{
        res.status(200).send(cliente)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

app.delete('/cliente/:uid', verificarToken, (req,res)=>{
    const{uid} = req.params

    Cliente.findByIdAndRemove(uid).exec()
    .then(cliente =>{
        res.status(200).send()
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

module.exports = app;