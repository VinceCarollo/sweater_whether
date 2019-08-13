var router = require('express').Router();
const sessionsController = require('../../../../controllers/api/v1/sessions_controller.js')

router.post('/', sessionsController)

module.exports = router;
