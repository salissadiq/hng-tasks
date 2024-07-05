require("dotenv").config({path: `${process.cwd()}/.env`})
const express = require("express");

const app = express()

require("./startup/routes")(app);



app.get("/", (req, res) => {
    res.send({
        message: "Hello world"
    })
})
const PORT = process.env.APP_PORT || 9090;
app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`))