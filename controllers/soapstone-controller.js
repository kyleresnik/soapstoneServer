var router = require('express').Router();
const Soapstone = require('../db').import('../models/soapstone');

router.post('/create', (req, res) => {
  console.log(req.body.log)
  Soapstone.create({
    tip: req.body.log.result
  })
  .then(
    function createSuccess(newSoapstone){
      res.status(200).json({
        soapstone: newSoapstone,
        message: "Message transmitted..."
      })
    },
    function createFail(err){
      res.status(500).send(err.message)
    }
  )
})

router.get('/all', (req, res) => {
  Soapstone.findAll()
    .then(
      function findAllSuccess(tips) {
        res.status(200).json({
          tips
        })
      },
      function findAllFail(err) {
        res.status(500).send("Was it you who rang the Bell of Awakening?")
      }
    )
})

router.put('/update/:id', (req, res) => {
  Soapstone.update(req.body.item, {where: {id: req.params.id}})
    .then(item => res.status(200).json(item))
    .catch(err => res.json(req.errors))
})

module.exports = router;