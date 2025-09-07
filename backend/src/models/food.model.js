const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
const foodPartnerModel = require('./foodpartner.models');

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    video:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodpartner"
    },
    price:{
        type:Number,
        required:true,
    }
})

const foodModel = mongoose.model("food",foodSchema);

module.exports = foodModel;