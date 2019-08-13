var router = require('express').Router();

router.post('/', require('./create_user.js'));

module.exports = router;
