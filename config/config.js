require("dotenv").config({path: `${process.cwd()}/.env`})
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres"
  },
  "test": {
    username: 'postgres.eemlkiurlbplerheqsjx',
    password: '.4czLq$M72KvZCE',
    database: 'postgres',
    host: 'aws-0-eu-west-2.pooler.supabase.com',
    port:'5432',
    dialect: "postgres"
  },
  "production": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres"
  }
}
