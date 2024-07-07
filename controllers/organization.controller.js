const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const { validateOrganisation, fieldValidationHandler } = require('../utils/fieldValidations');

const User = require('../models/User');
const Organisation = require('../models/Organisation');

// Create Organisation
const createOrganization = catchAsync(async (request, response) => {
  const { error } = validateOrganisation(request.body);
  if (error) return response.status(422).json(fieldValidationHandler(error.details[0]));

  const { name, description } = request.body;
  const newOrg = new Organisation({ name, description });

  await newOrg.save();

  const result = newOrg.toObject();
  delete result.createdAt;
  delete result.updatedAt;

  response.status(201).json({
    status: "success",
    message: "Organisation created successfully",
    data: result
  });
});

// Get All Organisations
const getAllOrganization = catchAsync(async (request, response) => {
  const organisations = await Organisation.find();
  response.status(200).json({
    status: "success",
    message: "Fetched Organisations",
    data: { organisations }
  });
});

// Get Single Organisation
const getOrganization = catchAsync(async (request, response) => {
  const { orgId } = request.params;
  const organisation = await Organisation.findById(orgId);

  if (!organisation) {
    return response.status(404).send({
      status: "Not found",
      message: "No Organisation found with that ID",
      statusCode: 404
    });
  }

  const result = organisation.toObject();
  delete result.createdAt;
  delete result.updatedAt;

  response.status(200).json({
    status: "success",
    message: "Fetched single organisation",
    data: result
  });
});

// Add User to Organisation
const addUserToOrganisation = catchAsync(async (request, response) => {
  const { orgId } = request.params;
  const { userId } = request.body;

  const organisation = await Organisation.findById(orgId);
  if (!organisation) {
    return response.status(404).send({
      status: "Not found",
      message: "No Organisation found with that ID",
      statusCode: 404
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return response.status(404).json({
      status: "User not found",
      message: "No user found with that ID",
      statusCode: 404
    });
  }

  organisation.users.push(user._id);
  await organisation.save();

  response.status(201).json({
    status: "success",
    message: "User added to organisation successfully"
  });
});

router.post('/create', createOrganization);
router.get('/all', getAllOrganization);
router.get('/:orgId', getOrganization);
router.post('/:orgId/addUser', addUserToOrganisation);

module.exports = router;
