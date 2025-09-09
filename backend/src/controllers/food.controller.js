const foodModel = require("../models/food.model");
const foodController = require("../controllers/food.controller");
const Router = express.Router();

async function createFood(req,res){
    res.send("food item created")
    console.log(req.body);
    
}
module.exports = {createFood}
