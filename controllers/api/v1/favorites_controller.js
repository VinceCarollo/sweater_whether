var User = require('../../../models').User;
var Location = require('../../../models').Location;

var createLocation = function(req, res, next) {
  User.findOne({
    where: {
      api_key: req.body.api_key
    }
  })
  .then(user => {
    if (user) {
      res.status(200).send({ user })
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send({ error: 'Not Authorized' })
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ error })
  })
}

module.exports = {
  create: createLocation
}
