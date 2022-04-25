const express = require("express");
const router = express.Router()

const controller = require('./controller')

// To handle JSON requests
router.use(express.json())

router.route('').post(controller.create);
router.route('').get(controller.read);
router.route('').put(controller.update);
// router.route('').delete(controller.delete);


module.exports = router

