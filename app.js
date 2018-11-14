require('dotenv').config();
var express = require('express');
var app = express();
var test = require('./controllers/testcontroller');
var authTest = require('./controllers/authtestcontroller');
var user = require('./controllers/usercontroller');
var soapstone = require('./controllers/soapstone-controller');
var sequelize = require('./db');
var bodyParser = require('body-parser')

sequelize.sync({force: true}); /* pass in {force: true} for resetting tables */
app.use(bodyParser.json());
app.use(require('./middleware/headers'));

/***************************
 * EXPOSED ROUTES
****************************/
app.use('/test', test);
app.use('/api/user', user);

/******************
 * PROTECTED ROUTES
*******************/
app.use(require('./middleware/validate-session'));
app.use('/authtest', authTest);

app.use('/api/log/', soapstone);

app.listen(process.env.PORT, () => console.log(`Server is listening on ${process.env.PORT}`));

// app.get('/', (req, res) => res.render('index'));

app.use('/api/test', function(req, res){
  res.send("This is data from the /api/test endpoint. It's from the server.")
});
