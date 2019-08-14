var router = require('express').Router();
const forecastsController = require('../../../../controllers/api/v1/forecasts_controller.js')

router.get('/', forecastsController.index)

module.exports = router;
