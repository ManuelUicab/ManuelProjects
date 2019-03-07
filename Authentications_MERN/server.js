const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const { mongoose } = require('./server/DB/conecction');

//settings
app.set('port', process.env.PORT || 3000);

//Middleware
app.use(morgan('dev'));
app.use(express.json());

//static files (le dice a express donde buscar los archivos)
app.use(express.static(path.join(__dirname,'./server/public')));

//Routes

app.use('/api/users', require('./server/routes/users'));
app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/events', require('./server/routes/events'));



app.get('/*', (req, res) =>{
    res.sendFile(path.join(__dirname,'./server/public/index.html'));
});


//starting Server
app.listen(app.get('port'), () =>{
    console.log(`Serve on port ${app.get('port')}`);
});