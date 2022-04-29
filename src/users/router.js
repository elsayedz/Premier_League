const express = require("express");
const router = express.Router()

const controller = require('./controller')

// To handle JSON requests
router.use(express.json())

router.route('').post(controller.create);
router.route('/signIn').post(controller.read);

// router.route('').delete(controller.delete);


module.exports = router

