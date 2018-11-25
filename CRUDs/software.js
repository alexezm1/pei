const express = require('express');
const Software = require('../models/software');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { verificarToken } = require('../middlewares/autentication')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.post('/software',verificarToken, (req,res)=>{
    const{name,enfoque,licencia} = req.body

    let nuevoSoftware = Software({
        name,
        enfoque,
        licencia
    });

    nuevoSoftware.save((err,software)=>{
        if(err) throw err;
        res.status(201).send(software)
    });
});

app.get('/software',verificarToken, (req,res)=>{
    Software.find().exec()
    .then(software =>{
        res.send(software)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

app.get('/software/:uid',verificarToken, (req,res)=>{
    const{uid} = req.params

    Software.findById(uid).exec()
    .then(software =>{
        res.send(software)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

app.put('/software/:uid',verificarToken, (req,res)=>{
    const{uid} = req.params

    Software.findByIdAndUpdate(uid, {$set:req.body},{new:true}).exec()
    .then(software =>{
        res.status(200).send(software)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

app.delete('/software/:uid', verificarToken,(req,res)=>{
    const{uid} = req.params

    Software.findByIdAndRemove(uid).exec()
    .then(software =>{
        res.status(200).send()
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

module.exports = app;