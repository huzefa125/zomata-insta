const mongoose = require('mongoose')

function connectionDB(){
    mongoose.connect("").then(()=>{
        console.log("MOngodb connect");
        
    })
}