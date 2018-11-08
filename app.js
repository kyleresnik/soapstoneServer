var express = require('express');
var app = express();
require('dotenv').config();
const user = require('./controllers/usercontroller');
var sequelize = require('./db');
var bodyParser = require('body-parser')

sequelize.sync(); /* pass in {force: true} for resetting tables */

app.use(bodyParser.json());

app.listen(process.env.PORT, () => console.log(`Server is listening on ${process.env.PORT}`));

app.use(express.static(__dirname + '/public'));

app.use(require('./models/headers'));

// app.get('/', (req, res) => res.render('index'));

app.use('/auth', user);