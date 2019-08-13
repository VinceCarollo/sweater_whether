var router = require('express').Router();
const { check, validationResult } = require('express-validator');
const usersController = require('../../../../controllers/api/v1/users_controller.js')

router.post('/', [
  check('email')
    .isEmail(),
  check('password')
    .isLength({ min: 4 })
], usersController.create);

module.exports = router;
