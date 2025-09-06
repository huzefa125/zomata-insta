const mongoose = require('mongoose')
require("dotenv").config();


function connectionDB() {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Mongodb connect");
    })
    .catch((err) => 
        console.log(("Mongo conecction error", err))
    )
}

module.exports = connectionDB;