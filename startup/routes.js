const express = require("express");

const auth = require("../routes/auth.routes");
const organization = require("../routes/organization.routes");
const user = require("../routes/user.routes");

module.exports = function (app) {
    app.use(express.json())
    app.use("/auth", auth);
    app.use("/api/organisations", organization);
    app.use("/api/users", user);

    app.use("*", (request, response, next) => {
        response.status(404).json({
            status: "NOT FOUND",
            message: "No Route Found!"
        })
    })
}