let express = require('express');
var router = express.Router();
var sequelize = require('../db');
let validateSession = require('../middleware/validate-session');
var Soapstone = sequelize.import('../models/soapstone');

//Get all soapstones for single user
router.get('/get', function(req, res) {
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
router.post('/create', validateSession, (req, res) => {
  if (!req.error) {
    let owner = req.user.id;
    let soapTextData = req.body.soapstone.soaptext;

    Soapstone.create({
      owner: owner,
      soaptext: soapTextData
    })
    .then(
      function createSoapSuccess(){
        res.status(200).json({
          soaptext: soapTextData
        });
      },
      function createSoapError(err){
        res.status(500, err.message);
      }
    )
  }
});

//Get single soapstone for individual user
// router.get('/get/:id', function (req, res) {
//   var data = req.params.id;
//   var userid = req.user.id;

//   Soapstone
//     .findOne({
//       where: { id: data, owner: userid }
//     }).then(
//       function findOneSuccess(data) {
//         res.json(data);
//       },
//       function findOneError(err) {
//         res.send(500, err.message);
//       }
//     );
// })

//Update soapstone for individual user
router.put('/update/:id', (req, res) => {
  if (!req.error) {
    let dataID = req.user.id;
    let soapTextData = req.body.soapstone.soaptext;

    Soapstone.update({
      soaptext: soapTextData
    }, { where: { id: dataID } } )
    .then(
      function updateSuccess() {
        res.json({
          soaptext: soapTextData
        });
      },
      function updateError(err){
        res.send(500, err.message);
      }
    )
  }
});

//Delete soapstone for individual user
router.delete('/delete/:id', validateSession, function (req, res) {
  // let dataID = req.soapstone.id;
  let dataID = req.params.id;
  
  Soapstone.destroy({ where: { id: dataID } })
    .then(
      function createDeleteSuccess() {
        res.status(200).send("Successfully deleted Soapstone!")
      },
      function createDeleteError(err) {
        res.send(500, err.message)
      }
    )
});

module.exports = router;