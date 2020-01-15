const express = require('express');
const errorMW = require('./middlewares/error');
const logger = require('./logger/logger');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const config = require('../config/index');
const indexRoutes = require('./routes.js');
const app = express();

// Allowing the app to read environment variables
dotenv.config();

app.set('port', config.common.port);

// Creating an instance for body-parser
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ 
  extended: true
})); 

// Defining which routes and middlewares is the app going to use
app.use('/', indexRoutes);
app.use(errorMW.handle);

app.listen(app.get('port'), () => {
    logger.info(`server on port ${app.get('port')}`);
});

module.exports = app;
