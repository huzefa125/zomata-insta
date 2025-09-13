const mongoose = require('mongoose')


function connectionDB() {
    console.log("MONGO_URL:", process.env.MONGO_URL);
    // console.log("All env vars:", Object.keys(process.env).filter(key => key.includes('MONGO')));
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Mongodb connect");
    })
    .catch((err) => 
        console.log(("Mongo conecction error", err))
    )
}

module.exports = connectionDB;