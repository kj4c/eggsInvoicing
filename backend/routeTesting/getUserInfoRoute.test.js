const request = require('supertest');
const app = require('../app');

// mocking the authLogin function to simulate logging in
jest.mock('../functions/getUserInfo', () => jest.fn().mockImplementation((uid) => {
  if (uid === 1) {
    return Promise.resolve({
      status: 200,
      username: 'winny',
      email: 'winnie@gmail.com',
      phone_no: '0123456789',
    });
  } else {
    return Promise.reject(new Error('Failed to get user info:'));
  }
}));

describe('/getUserInfo route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully get user info', async () => {
    const response = await request(app)
      .get('/getUserInfo?uid=1');

    expect(response.statusCode).toBe(200);
    expect(response.body.username).toEqual('winny');
    expect(response.body.email).toEqual('winnie@gmail.com');
    expect(response.body.phone_no).toEqual('0123456789');

    // testing with incorrect credentials
    const responseForInvalidCredentials = await request(app)
      .get('/getUserInfo?uid=1000');

    expect(responseForInvalidCredentials.statusCode).toBe(400);
    expect(responseForInvalidCredentials.body).toEqual({ message: 'Failed to get user info:' });
  });
});
