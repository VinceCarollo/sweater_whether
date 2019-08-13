const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
  });
};
