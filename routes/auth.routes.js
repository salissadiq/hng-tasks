const router = require('express').Router()
const { signup, login }  = require("../controllers/auth.controller");

router.route("/register").post(signup)

router.route("/login").post(login)

module.exports = router;


