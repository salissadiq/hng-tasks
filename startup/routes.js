const express = require("express");

const auth = require("../routes/auth.routes");
const organization = require("../routes/organization.routes");
const user = require("../routes/user.routes");

module.exports = function (app) {
    app.use(express.json())
    app.use("/api/v1/auth", auth);
    app.use("/api/v1/organization", organization);
    app.use("/api/v1/user", user);
}