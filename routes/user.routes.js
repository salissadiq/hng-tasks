const {protectedRoute} = require("../middleware/authentication")


const { getUser } = require('../controllers/user.controller')

const router = require('express').Router()

router.route('/:id').get(protectedRoute, getUser);

module.exports = router;