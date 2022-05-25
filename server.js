const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {pool,mssql } = require('./dbCon/dbsql')
const app = express();

app.use(bodyParser.json({
    limit: '50mb'
  }));
  
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
  }));
app.options('*', cors({ credentials: true, origin: [ 'http://localhost:4200','http://localhost:4300'] }));
app.use(cors({ credentials: true, origin: [ 'http://localhost:4200'] }));

const registrationcontroller = require('./controller/registrationcontroller.js')(app);
app.listen(5000, ()=>{
    console.log('success to connect');
})

module.exports = app;