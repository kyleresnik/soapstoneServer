var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/user');

// const validateSession = (req, res, next) => {
//   const sessionToken = req.headers.authorization;
//   jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decodedToken) => {
//       if (!err && decodedToken){
//           User.findOne({where: {id: decodedToken.id}})
//           .then(user => {
//               if (!user) throw 'err'
//               req.user = user;
//               return next();
//           })
//           .catch(err => next(err))
//       } else {
//           req.errors = err;
//           return next();
//       }
//   })
// }

// module.exports = validateSession;



module.exports = function(req, res, next) {
  if (req.method == 'OPTIONS') {
   next()
  } else {
    var sessionToken = req.headers.authorization;
    console.log("token", sessionToken)
    if (!sessionToken) return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
      jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
        if(decoded){
          User.findOne({where: { id: decoded.id}}).then(user => {
            req.user = user;
            return next();
          },
          function(){
            res.status(401).send({error: 'Not authorized'});
          });
        } else {
          res.status(400).send({error: 'Not authorized'});
        }
      });
    }
  }
}