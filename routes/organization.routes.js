const { createOrganization, getOrganization, getAllOrganization } = require('../controllers/organization.controller');

const router = require('express').Router();

router.route('/').post(createOrganization)
router.route('/').get(getAllOrganization)
router.route('/:id').get(getOrganization)

module.exports = router;