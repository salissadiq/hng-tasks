const request = require('supertest');
const app = require('../index');
const { sequelize, User, Organization, UserOrganisation } = require('../db/models');
describe('Auth Endpoints', () => {
  // beforeAll(async () => {
  //   await sequelize.sync({ alter: true });
  // });
  // afterAll(async () => {
  //   await sequelize.close();
  // });
  describe('POST /auth/register', () => {
    it('should register a new user with a default organisation', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password',
          phone: '09088888888',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('user');
      expect(res.body).toHaveProperty('token');
      const user = await User.findOne({
        where: { email: 'john@example.com' }
      });
      const organisation = await Organization.findOne({
        where: { name: "John's Organisation" }
      });
       const userOrganisation = await UserOrganisation.findOne({
        where: { userId: user.userId }});
      expect(user.firstName).toEqual("John");
      expect(organisation.name).toEqual("John's Organization");
      expect(userOrganisation.userId).toEqual(user.userId);
    });
    // it('should return 422 if email already exists', async () => {
    //   await request(app)
    //     .post('/api/auth/register')
    //     .send({
    //       firstName: 'Jane',
    //       lastName: 'Doe',
    //       email: 'john@example.com',
    //       password: 'password',
    //       phone: '09088888888',
    //     });
    //   const res = await request(app)
    //     .post('/api/auth/register')
    //     .send({
    //       firstName: 'Jane',
    //       lastName: 'Doe',
    //       email: 'john@example.com',
    //       password: 'password',
    //       phone: '09088888888',
    //     });
    //   expect(res.statusCode).toEqual(422);
    //   expect(res.body).toHaveProperty('errors');
    // });
    // it('should return 422 if required fields are missing', async () => {
    //   const res = await request(app)
    //     .post('/api/auth/register')
    //     .send({});
    //   expect(res.statusCode).toEqual(422);
    //   expect(res.body).toHaveProperty('errors');
    // });
    // it('should return 422 if firstName is missing', async () => {
    //   const res = await request(app)
    //     .post('/api//auth/register')
    //     .send({
    //       lastName: 'Doe',
    //       email: 'doe@example.com',
    //       password: 'password',
    //       phone: '09088888888',
    //     });
    //   expect(res.statusCode).toEqual(422);
    //   expect(res.body.errors[0].msg).toEqual('First name is required');
    // });
    // it('should return 422 if lastName is missing', async () => {
    //   const res = await request(app)
    //     .post('/api/auth/register')
    //     .send({
    //       firstName: 'Jane',
    //       email: 'doe@example.com',
    //       password: 'password',
    //       phone: '09088888888',
    //     });
    //   expect(res.statusCode).toEqual(422);
    //   expect(res.body.errors[0].msg).toEqual('Last name is required');
    // });
    // it('should return 422 if email is missing', async () => {
    //   const res = await request(app)
    //     .post('/api/auth/register')
    //     .send({
    //       firstName: 'Jane',
    //       lastName: 'Doe',
    //       password: 'password',
    //       phone: '09088888888',
    //     });
    //   expect(res.statusCode).toEqual(422);
    //   expect(res.body.errors[0].msg).toEqual('Email is required');
    // });
    // it('should return 422 if password is missing', async () => {
    //   const res = await request(app)
    //     .post('/api/auth/register')
    //     .send({
    //       firstName: 'Jane',
    //       lastName: 'Doe',
    //       email: 'doe@example.com',
    //       phone: '09088888888',
    //     });
    //   expect(res.statusCode).toEqual(422);
    //   expect(res.body.errors[0].msg).toEqual('Password is required');
    // });
  });
  // describe('POST /auth/login', () => {
  //   it('should login an existing user', async () => {
  //     await request(app)
  //       .post('/api/auth/register')
  //       .send({
  //         firstName: 'Jane',
  //         lastName: 'Doe',
  //         email: 'jane@example.com',
  //         password: 'password',
  //         phone: '09088888888',
  //       });
  //     const res = await request(app)
  //       .post('/api/auth/login')
  //       .send({
  //         email: 'jane@example.com',
  //         password: 'password',
  //       });
  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body).toHaveProperty('token');
  //     expect(res.body).toHaveProperty('user');
  //   });
  //   it('should return 400 if email or password is incorrect', async () => {
  //     const res = await request(app)
  //       .post('/api/auth/login')
  //       .send({
  //         email: 'jane@example.com',
  //         password: 'wrongpassword',
  //       });
  //     expect(res.statusCode).toEqual(400);
  //     expect(res.body).toHaveProperty('errors');
  //   });
  // });
});