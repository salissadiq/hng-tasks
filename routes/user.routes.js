const { getUser } = require('../controllers/user.controller')

const router = require('express').Router()

router.route('/:id').get(getUser);

module.exports = router;