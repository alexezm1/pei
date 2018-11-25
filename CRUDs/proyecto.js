const express = require('express');
const Proyecto = require('../models/proyecto');
const Cliente = require('../models/cliente');
const Empleado = require('../models/employee');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { verificarToken } = require('../middlewares/autentication')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.post('/proyecto',verificarToken, (req,res)=>{
    const{clasificacion,cliente,employee,fecha_inic,fecha_fin} = req.body

    let nuevoProyecto = Proyecto({
        clasificacion,
        cliente,
        employee,
        fecha_inic,
        fecha_fin
    });

    nuevoProyecto.save((err,proyecto)=>{
        if(err) throw err;
        res.status(201).send(proyecto)
    });
});

app.get('/proyecto',verificarToken, (req,res)=>{
    Proyecto.find().exec()
    .then(proyecto =>{
        res.send(proyecto)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

app.get('/proyecto/:uid', verificarToken,(req,res)=>{
    const{uid} = req.params

    Proyecto.findById(uid, {})
    .populate({path: 'cliente', model: Cliente})
    .populate({path: 'employee', model: Empleado})
    .exec()
    .then(proyecto =>{
        res.status(200).send(proyecto)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

app.put('/proyecto/:uid',verificarToken,(req,res)=>{
    const{uid} = req.params

    Proyecto.findByIdAndUpdate(uid, {$set:req.body},{new:true}).exec()
    .then(proyecto =>{
        res.status(200).send(proyecto)
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

app.delete('/proyecto/:uid', verificarToken,(req,res)=>{
    const{uid} = req.params

    Proyecto.findByIdAndRemove(uid).exec()
    .then(proyecto =>{
        res.status(200).send()
    })
    .catch(err =>{
        res.status(404).send(err)
    })
});

module.exports = app;