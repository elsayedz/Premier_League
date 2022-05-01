const express = require("express");
const router = express.Router()

const controller = require('./controller')

// To handle JSON requests
router.use(express.json())

// Get top 10 teams by matches won
router.route('/mostWins').get(controller.read);

// Get top 10 teams by home matches won
router.route('/mostHomeWins').get(controller.readHomeWins);

// TODO: Should combine these endpoints into 1 path with a parameter 

// Get top 10 teams by yellow cards
router.route('/mostYellowCards').get(controller.readMostYC);

// Get top 10 teams by fouls
router.route('/mostFouls').get(controller.readMostFouls);

// Get top 10 teams by shots
router.route('/mostShots').get(controller.readMostShots);


module.exports = router

