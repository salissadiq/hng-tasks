const { createOrganization, getOrganization, getAllOrganization,addUserToOrganisation } = require('../controllers/organization.controller');
const {protectedRoute} = require("../middleware/authentication")
const router = require('express').Router();

router.route('/').post(protectedRoute, createOrganization)
router.route('/').get(protectedRoute, getAllOrganization)
router.route('/:orgId').get(protectedRoute, getOrganization)
router.route('/:orgId/users').post(protectedRoute, addUserToOrganisation)

module.exports = router;