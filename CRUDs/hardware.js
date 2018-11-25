const express = require('express');
const Hardware = require('../models/hardware');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { verificarToken } = require('../middlewares/autentication')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.post('/hardware', verificarToken,(req,res)=>{
    const{so,proce,hdd,ssd,ram,grafica,marca} = req.body

    let nuevoHardware = Hardware({
        marca,
        so,
        proce,
        hdd,
        ssd,
        ram,
        grafica
    });

    nuevoHardware.save((err,hardware)=>{
        if(err) throw err;
        res.status(201).send(hardware)
    });
});

app.get('/hardware',verificarToken, (req,res)=>{
    Hardware.find().exec()
    .then(hardware =>{
        res.send(hardware)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

app.get('/hardware/:uid',verificarToken, (req,res)=>{
    const{uid} = req.params

    Hardware.findById(uid).exec()
    .then(hardware =>{
        res.send(hardware)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

app.put('/hardware/:uid',verificarToken, (req,res)=>{
    const{uid} = req.params

    Hardware.findByIdAndUpdate(uid, {$set:req.body},{new:true}).exec()
    .then(hardware =>{
        res.status(200).send(hardware)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

app.delete('/hardware/:uid',verificarToken, (req,res)=>{
    const{uid} = req.params

    Hardware.findByIdAndRemove(uid).exec()
    .then(hardware =>{
        res.status(200).send()
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

module.exports = app;