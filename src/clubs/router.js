const express = require("express");
const router = express.Router()

const controller = require('./controller')

// To handle JSON requests
router.use(express.json())

// Get club by stad
router.route('').get(controller.read);

// Get teams by city
router.route('/city').get(controller.readByCity);

module.exports = router

