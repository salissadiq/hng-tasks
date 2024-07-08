require("dotenv").config({path: `${process.cwd()}/.env`})

const { Sequelize } = require('sequelize')

const env = process.env.NODE_ENV || "development";

const config = require("./config")[env]

const sequelize = new Sequelize(config)
// const sequelize = new Sequelize(`postgresql://postgres.lvvkmgwcflcdvcpauiaq:[YOUR-PASSWORD]@aws-0-eu-west-2.pooler.supabase.com:5432/postgres`)

module.exports = sequelize