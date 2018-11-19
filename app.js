//IMPORTS
require('dotenv').config();
var express = require('express');
var app = express();
var sequelize = require('./db');
var bodyParser = require('body-parser')

//CONTROLLERS
const test = require('./controllers/testcontroller');
const authTest = require('./controllers/authtestcontroller');
const user = require('./controllers/usercontroller');
const soapstone = require('./controllers/soapstone-controller');

//MIDDLEWARE
sequelize.sync(); //{force: true} for resetting tables
app.use(bodyParser.json());
app.use(require('./middleware/headers'));

//EXPOSED ROUTES
app.use('/test', test);
app.use('/user', user);

//VALIDATION
app.use(require('./middleware/validate-session'));

//PROTECTED ROUTES
app.use('/soapstone', soapstone);

//LISTEN
app.listen(process.env.PORT, 
  () => console.log(`Listening on ${process.env.PORT}`));