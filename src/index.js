const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose } = require('./database');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/datos' ,require('./routes/dato.routes'));
// Static files
app.use(express.static(path.join(__dirname, 'public')));
//console.log(path.join(__dirname, 'public'));

// Starting de server

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});