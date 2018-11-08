const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/signup', (req, res) => {
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  })
    .then(
      createSuccess = (user) => {
        let token = jwt.sign({id: user.id}, 'process.env.JWT_SECRET', {expiresIn: 60 * 60 * 24})
        res.json({
          user: user,
          message: 'New user created!',
          sessionToken: token
        })
      },
      createError = err => res.send(500, err)
    )
})

module.exports = router;