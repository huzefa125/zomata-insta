require('dotenv').config();
const app = require('./src/app.js');
const connectionDB = require("./src/db/db.js")

connectionDB()

app.listen(3000,()=>{
    console.log("Server is runnin on port on 3000");  
})