const express = require('express')
const foodController = require("../controllers/food.controller")
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware")

router.post('/',authMiddleware,foodController.createFood)

module.exports = router;