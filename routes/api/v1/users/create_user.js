const bcrypt = require('bcrypt');
const saltRounds = 10;
var User = require('../../../../models').User;

module.exports = function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    User.create({
      email: req.body.email,
      password: hash,
      api_key: 'some_key',
      isAdmin: false
    })
    .then(user => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify({ api_key: user.api_key }))
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error })
    })
  });
};
