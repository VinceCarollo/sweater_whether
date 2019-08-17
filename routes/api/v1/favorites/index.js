var router = require('express').Router();
const favoritesController = require('../../../../controllers/api/v1/favorites_controller.js')

router.post('/', favoritesController.create)

router.get('/', favoritesController.index)

module.exports = router;
