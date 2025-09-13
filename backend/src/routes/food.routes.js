const express = require('express')
const foodController = require("../controllers/food.controller")
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware")
const multer = require("multer")

const upload = multer({
    storage : multer.memoryStorage(),
})
router.get('/', foodController.getAllFoods)
router.post('/',authMiddleware,upload.single('video'),foodController.createFood)

module.exports = router;