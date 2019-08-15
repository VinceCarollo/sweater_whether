var bcrypt = require('bcrypt');
var saltRounds = 10;
var { check, validationResult } = require('express-validator');
var uuidv4 = require('uuid/v4');
var User = require('../../../models').User;

const createUser = function (req, res, next) {
  let errors = validationResult(req)
  user = User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (user) {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error: 'User already exists' })
    } else {
      if (req.body.password != req.body.password_confirmation) {
        return res.status(500).json({ errors: 'passwords do not match' })
      } else if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() })
      }
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        User.create({
          email: req.body.email,
          password: hash,
          api_key: uuidv4(),
          isAdmin: false
        })
        .then(user => {
          res.setHeader("Content-Type", "application/json");
          res.status(201).send(JSON.stringify({ api_key: user.api_key }))
        })
        .catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(500).send({ error })
        })
      });
    }
  })
};

module.exports = {
  create: createUser
}
