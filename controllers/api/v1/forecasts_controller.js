var User = require('../../../models').User;

const forecastIndex = function(req, res, next) {
  User.findOne({
    where: {
      api_key: req.body.api_key
    }
  })
  .then(user => {
    res.status(200).send({ user })
  })
  .catch(error => {

  })
}
 module.exports = {
   index: forecastIndex
 }
