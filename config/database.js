require("dotenv").config({path: `${process.cwd()}/.env`})

const { Sequelize } = require('sequelize')

const env = process.env.NODE_ENV || "development";

const config = require("./config")[env]

const sequelize = new Sequelize(config)
// const sequelize = new Sequelize(`postgresql://salscodes:neNMgBEAB9vlHIOjH2voHs8xSRYGjUaW@dpg-cq5efutds78s73d0q9dg-a.oregon-postgres.render.com/userorgs`)

module.exports = sequelize