const request = require('supertest');
const app = require('../app');

// mocking the authLogin function to simulate logging in
jest.mock('../functions/authLogin', () => jest.fn().mockImplementation((username, password) => {
  if (username === 'validUser' && password === 'validPass') {
    return Promise.resolve({
      status: 200,
      uid: 1
    });
  } else {
    return Promise.reject(new Error('Failed to login'));
  }
}));

describe('/login route', () => {
  it('should successfully login with correct credentials', async () => {
    const mockLoginData = {
      username: 'validUser',
      password: 'validPass',
    };

    const response = await request(app)
      .post('/login')
      .send(mockLoginData);

    expect(response.statusCode).toBe(200);
    expect(response.body.uid).toEqual(1);

    // testing with incorrect credentials
    const responseForInvalidCredentials = await request(app)
      .post('/login')
      .send({ username: 'wrongUser', password: 'wrongPass' });

    expect(responseForInvalidCredentials.statusCode).toBe(400);
    expect(responseForInvalidCredentials.body).toEqual({ message: 'Failed to login:' });
  });
});
