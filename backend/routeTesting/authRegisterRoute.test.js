const request = require('supertest');
const app = require('../app');

jest.mock('../functions/authRegister', () => jest.fn().mockImplementation((email, phone, username, password) => {
  if (email && phone && username && password) {
    return Promise.resolve({
      status: 200,
      message: 'Successfully registered.'
    });
  } else {
    return Promise.reject(new Error('Failed to register new user:'));
  }
}));

describe('/register route', () => {
  it('should handle the user registration process correctly', async () => {
    const mockRegisterData = {
      email: 'jackson@example.com',
      phone: '1234567890',
      username: 'jackson123',
      password: 'safePassword123',
    };

    const response = await request(app)
      .post('/register')
      .send(mockRegisterData);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Successfully registered.');

    const responseForBadRequest = await request(app)
      .post('/register')
      .send({});

    expect(responseForBadRequest.statusCode).toBe(400);
    expect(responseForBadRequest.body).toEqual({ message: 'Failed to register new user:' });
  });
});
