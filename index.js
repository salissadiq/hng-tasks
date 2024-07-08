require("dotenv").config({path: `${process.cwd()}/.env`})
const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const sequelize = require("./config/database");


const app = express()
app.get("/", (req, res) => {
    res.send({
        message: "Server is live"
    })
})
require("./startup/routes")(app);
app.use(errorHandler)
const PORT = process.env.APP_PORT || 9090;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

module.exports = app;