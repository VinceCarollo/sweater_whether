var router = require('express').Router();
const { check, validationResult } = require('express-validator');

router.post('/', [
  check('email')
    .isEmail(),
  check('password')
    .isLength({ min: 4 })
], require('./create_user.js'));

module.exports = router;
