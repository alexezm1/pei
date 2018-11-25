const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('./config/config')
app.use(require('./CRUDs/cliente'));
app.use(require('./CRUDs/user_employee'));
app.use(require('./CRUDs/hardware'));
app.use(require('./CRUDs/software'));
app.use(require('./CRUDs/user'));
app.use(require('./CRUDs/login'))
app.use(require('./CRUDs/proyecto'));
app.use(require('./CRUDs/employee'));

app.get('/', (req,res)=>{
    res.send('index')
});

mongoose.connect('mongodb://alexzam1:alexzam1@ds115154.mlab.com:15154/dbrivka',{ useNewUrlParser: true } ,(err, res)=>{
    if( err ) throw err;

    console.log("Base de datos ONLINE");
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});