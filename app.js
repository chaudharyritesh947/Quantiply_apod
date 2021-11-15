const express = require('express');
const {apodRequest} = require('./controller/viewController');
const app = express();
const DB = require('./util/database.js');
const path = require('path');
const bodyParser = require('body-parser');
const url = 'mongodb://localhost:27017/quantiply_apod';

DB.makeDBConnection(url);
app.use('/', express.static(path.resolve(__dirname, 'view')))

app.use('/images', express.static(path.resolve(__dirname, 'images'))); 

app.get('/api/get',apodRequest);

app.listen(9000, '127.0.0.1', ()=>{
    console.log('Server is runing...');
});
