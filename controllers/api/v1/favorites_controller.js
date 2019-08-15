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
      user.createLocation({
        name: req.body.location
      })
      .then(location => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send({ message: `${location.name} has been added to your favorites` })
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send({ error })
      })
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
