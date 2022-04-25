const express = require("express");
const router = express.Router()

const controller = require('./controller')

// To handle JSON requests
router.use(express.json())

// Create a review
router.route('').post(controller.create);

// Get all reviews for certain user 
router.route('').get(controller.read);

// Get all reviews for certain match
router.route('/match').get(controller.getMatchReviews);

//Update user review
router.route('').put(controller.update)

module.exports = router

