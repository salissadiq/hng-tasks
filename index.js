const express = require("express");

const app = express()

require("./startup/routes")(app);



app.get("/", (req, res) => {
    res.send({
        message: "Hello world"
    })
})

app.listen(9090, ()=> console.log("Server running"))