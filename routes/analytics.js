const express = require('express')
const controller = require('../controllers/analytics')
const router = express.Router()

router.get('/overview', controller.overview)
router.get('/analitics', controller.analytics)

module.exports = router