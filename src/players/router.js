const express = require("express");
const router = express.Router()

const controller = require('./controller')

// To handle JSON requests
router.use(express.json())

// Get player info by name or position
router.route('').get(controller.read);

// Get player history by name
router.route('/hist').get(controller.readHist);

router.route('')

// Get players club hist ny nationality
router.route('/nationality').get(controller.readPlayersWithNat)

module.exports = router

