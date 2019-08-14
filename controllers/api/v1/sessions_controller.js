var User = require('../../../models').User;
var bcrypt = require('bcrypt');

const newSession = function(req, res, next) {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    let correctPass = bcrypt.compareSync(req.body.password, user.password);
    if (correctPass) {
      let api_key = user.api_key
      res.setHeader("Content-Type", "application/json");
      res.status(200).send({ api_key })
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error: 'Incorrect Email/Password Combination' })
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ error: 'Incorrect Email/Password Combination' })
  })
}

module.exports = {
  new: newSession
}
