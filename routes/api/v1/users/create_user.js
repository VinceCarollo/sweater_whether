const bcrypt = require('bcrypt');
const saltRounds = 10;
const { check, validationResult } = require('express-validator');
var User = require('../../../../models').User;

module.exports = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else if (req.body.password != req.body.password_confirmation) {
    return res.status(422).json({ errors: 'passwords do not match' })
  }
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
