var router = require('express').Router();
var sequelize = require('../db')
var User = sequelize.import('../models/user');
var Soapstone = require('../db').import('../models/soapstone');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

//Handshake
router.get('/', function(req, res) {
  res.send("Soapstone handshake successful!")
})

//Get all soapstones for single user
router.get('/getall', function(req, res) {
  var userid = req.user.id;

  Soapstone
    .findAll({
      where: { owner: userid }
    })
    .then(
      function findAllSuccess(data){
        res.json(data);
      },
      function findAllError(err){
        res.send(500, err.message);
      }
    );
});

//Post new soapstone
router.post('/create', function (req, res) {
  var owner = req.user.id;
  var soapTextData = req.body.soapstone.soaptext;

  Soapstone.create({
    soaptext: soapTextData,
    owner: owner
  })
  .then(
    function createSuccess(soaptextdata){
      res.status(200).json({
        soaptextdata: soaptextdata
      });
    },
    function createError(err){
      res.status(500, err.message);
    }
  )
})

//Get single soapstone for individual user
router.get('/get/:id', function (req, res) {
  var data = req.params.id;
  var userid = req.user.id;

  Soapstone
    .findOne({
      where: { id: data, owner: userid }
    }).then(
      function findOneSuccess(data) {
        res.json(data);
      },
      function findOneError(err) {
        res.send(500, err.message);
      }
    );
})

//Update soapstone for individual user
router.put('/update/:id', (req, res) => {
  var data = req.params.id;
  var soaptextdata = req.body.soaptextdata;

  Soapstone
    .update({
      soaptextdata: soaptextdata
    },
    {where: {id: data}}
    ).then(
      function updateSuccess(Soapstone) {
        res.json({
          soaptextdata: soaptextdata
        });
      },
      function updateError(err){
        res.send(500, err.message);
      }
    )
});

//Delete soapstone for individual user
router.delete('/delete/:id', function(req, res) {
  var data = req.params.id;
  var userid = req.user.id;

  Soapstone
    .destroy({
      where: { id: data, owner: userid }
    }).then(
      function deleteSoapSuccess(data){
        res.send("Successfully deleted");
      },
      function deleteSoapError(err){
        res.send(500, err.message);
      }
    )
})

module.exports = router;